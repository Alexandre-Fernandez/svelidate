import { $Form, Form, FormField, Subscriber, Svelidate$Form } from "../types"
import {
	createNaked$Form,
	dispatch,
	forEachFormField,
	getFormFieldValues,
} from "./utils"

export function svelidate<F extends Form>(initialForm: F) {
	const subscribers: Subscriber[] = []

	const $form: $Form<F> = {
		...createNaked$Form(initialForm),
		$st: {
			invalid: true,
			submitted: false,
			initial: Object.freeze(initialForm),
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
				dispatch(subscribers, $form)
			},
			untouch: () => {
				forEachFormField(
					$form,
					formField => (formField.touched = false)
				)
				dispatch(subscribers, $form)
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
	updateFormState($form as $Form<F>)

	let lastValues = getFormFieldValues($form)
	return {
		subscribe(fn) {
			fn($form as $Form<F>)
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
			dispatch(subscribers, newForm)
			lastValues = getFormFieldValues(newForm)
		},
	} as Svelidate$Form<F>
}

function updateFormState<F extends Form>(newForm: $Form<F>) {
	let isInvalid = false
	forEachFormField(newForm, formField => {
		if (formField.invalid) isInvalid = true
	})
	newForm.$st.invalid = isInvalid
}

function updateFormField<F extends Form>(
	formField: Required<FormField>,
	newValue: F[string]["value"] = formField.value
) {
	formField.errors = formField.validators.reduce((errors, validator) => {
		const error = validator(newValue)
		if (error !== undefined) errors.push(error)
		return errors
	}, [] as string[])
	if (formField.errors.length > 0) formField.invalid = true
	else formField.invalid = false
}
