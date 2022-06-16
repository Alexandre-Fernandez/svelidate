import {
	storeDispatch,
	forEachFormField,
	getFormFieldValues,
} from "../utilities/form"
import type {
	SvelidateForm,
	UninitializedForm,
	Subscriber,
	SvelidateFormStore,
	NakedSvelidateForm,
	HtmlValidator,
	SvelidateField,
	SvelidateConfiguration,
	PartialAll,
} from "../types"
import { mergeObjects } from "../utilities/general"
import { isLookahead } from "../utilities/regex"
import { createLocalConfig, svelidateConfig } from "./config"

export function svelidate<F extends UninitializedForm>(
	initialForm: F,
	config: PartialAll<SvelidateConfiguration> = svelidateConfig
) {
	let localConfig =
		config === svelidateConfig ? svelidateConfig : createLocalConfig(config)
	const subscribers: Subscriber[] = []
	const $form: SvelidateForm<F> = {
		...createNakedSvelidateForm(initialForm),
		$st: {
			invalid: true,
			submitted: false,
			initial: Object.freeze(initialForm),
			form: null,
		},
		$fn: {
			submit: (e?: SubmitEvent) => {
				e?.preventDefault()
				$form.$st.submitted = true
				$form.$fn.untouch()
				$form.$on.submit(e)
			},
			reset: () => {
				for (const key in $form.$initial) {
					$form[key].touched = false
					$form[key].value = $form.$st.initial[key].value
					updateFormField($form[key])
				}
				updateFormState($form)
				storeDispatch(subscribers, $form)
			},
			untouch: () => {
				forEachFormField(
					$form,
					formField => (formField.touched = false)
				)
				storeDispatch(subscribers, $form)
			},
			getErrors: () => {
				let errors: string[] = []
				forEachFormField($form, formField => {
					if (formField.errors.length > 0) {
						errors = [...errors, ...formField.errors]
					}
				})
				return errors
			},
		},
		$on: { submit: (e?: SubmitEvent) => {}, touch: (key: string) => {} },
	}

	// init
	forEachFormField($form, formField => updateFormField(formField))
	updateFormState($form as SvelidateForm<F>)

	let lastValues = getFormFieldValues($form)
	return {
		subscribe(fn) {
			fn($form as SvelidateForm<F>)
			subscribers.push(fn)
			return () => subscribers.splice(subscribers.indexOf(fn), 1)
		},
		set(newForm) {
			forEachFormField(newForm, (formField, key) => {
				if (lastValues[key] === undefined) return
				if (lastValues[key] !== formField.value) {
					if (!formField.touched) {
						formField.touched = true
						newForm.$on.touch(key)
					}
					updateFormField(formField)
				}
			})
			updateFormState(newForm)
			storeDispatch(subscribers, newForm)
			lastValues = getFormFieldValues(newForm)
		},
	} as SvelidateFormStore<F>
}

function updateFormState<F extends UninitializedForm>(
	newForm: SvelidateForm<F>
) {
	let isInvalid = false
	forEachFormField(newForm, formField => {
		if (formField.invalid) isInvalid = true
	})
	newForm.$st.invalid = isInvalid
}

function updateFormField(formField: Required<SvelidateField>) {
	let pattern = ""
	const errors = []
	const htmlValidator: HtmlValidator = {}
	for (const validator of formField.validators) {
		const error = validator.js(formField.value)
		if (error !== undefined) errors.push(error)
		if (!formField.attributes.type) continue
		const { pattern: lookahead, ...localValidator } = validator.html(
			formField.attributes.type
		)
		if (lookahead && isLookahead(lookahead)) pattern += lookahead
		mergeObjects(htmlValidator, localValidator)
	}
	if (pattern) htmlValidator.pattern = `^${pattern}.+$`

	// adding errors :
	formField.errors = errors
	if (formField.errors.length > 0) formField.invalid = true
	else formField.invalid = false

	// adding attributes :
	mergeObjects(formField.attributes, htmlValidator)
}

function createNakedSvelidateForm<F extends UninitializedForm>(form: F) {
	return Object.entries(form).reduce(
		(prev, [name, { attributes, ...otherProps }]) => {
			const formField: Required<SvelidateField> = {
				errors: [],
				touched: false,
				validators: [],
				invalid: false,
				attributes: {
					name,
					...attributes,
				},
				...otherProps,
			}
			return {
				...prev,
				[name]: formField,
			}
		},
		{} as NakedSvelidateForm<F>
	)
}
