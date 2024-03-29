import { createLocalConfig, svelidateConfig } from "../config"
import type { SvelidateConfiguration } from "../types/svelidate/config"
import type { UninitializedForm } from "../types/svelidate/core/input"
import type {
	NakedSvelidateForm,
	SvelidateField,
	SvelidateForm,
} from "../types/svelidate/core/output"
import type { Subscriber, SvelidateFormStore } from "../types/svelte"
import type { PartialAll } from "../types/utilities"
import { forEachFormField, getFormFieldValues } from "./state/helpers"
import { updateFormField, updateFormState } from "./state/update"

export function createNakedSvelidateForm<F extends UninitializedForm>(form: F) {
	return Object.entries(form).reduce(
		(prev, [name, { attributes, ...otherProps }]) => {
			const formField: Required<SvelidateField> = {
				errors: [],
				touched: false,
				validators: [],
				invalid: false,
				type: null,
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

export function storeDispatch<F extends UninitializedForm>(
	to: Subscriber[],
	form: SvelidateForm<F>
) {
	to.forEach(subscriber => subscriber(form))
}

export default function svelidate<F extends UninitializedForm>(
	initialForm: F,
	config: PartialAll<SvelidateConfiguration> = svelidateConfig
) {
	const localConfig =
		config === svelidateConfig ? svelidateConfig : createLocalConfig(config)

	const subscribers: Subscriber[] = []
	const $form: SvelidateForm<F> = {
		...createNakedSvelidateForm(initialForm),
		$st: {
			invalid: true,
			submitted: false,
			initial: Object.freeze(initialForm),
			form: null,
			errors: [],
		},
		$fn: {
			submit: (e?: SubmitEvent) => {
				e?.preventDefault()
				$form.$st.submitted = true
				$form.$fn.untouch()
				$form.$on.submit(e)
			},
			reset: () => {
				Object.keys($form.$initial).forEach(key => {
					$form[key].touched = false
					$form[key].value = $form.$st.initial[key].value
					updateFormField($form[key], $form, localConfig)
				})
				updateFormState($form)
				storeDispatch(subscribers, $form)
			},
			untouch: () => {
				forEachFormField($form, formField => {
					formField.touched = false
				})
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
		$on: { submit: () => {}, touch: () => {} },
		$el: null,
	}

	forEachFormField($form, formField =>
		updateFormField(formField, $form, localConfig)
	)
	updateFormState($form)

	let lastValues = getFormFieldValues($form)
	return {
		subscribe(fn) {
			fn($form as SvelidateForm<F>)
			subscribers.push(fn)
			return () => subscribers.splice(subscribers.indexOf(fn), 1)
		},
		set(newForm) {
			if (newForm.$el && !newForm.$el.hasSvelidateListener) {
				newForm.$el.addEventListener("submit", e =>
					newForm.$fn.submit(e)
				)
				newForm.$el.hasSvelidateListener = true
			}

			forEachFormField(newForm, (formField, key) => {
				if (lastValues[key] !== formField.value) {
					if (!formField.touched) {
						formField.touched = true
						newForm.$on.touch(key)
					}
				}
				updateFormField(formField, $form, localConfig)
			})

			updateFormState(newForm)

			storeDispatch(subscribers, newForm)
			lastValues = getFormFieldValues(newForm)
		},
	} as SvelidateFormStore<F>
}

// TODO optimize lastValues to only update modified values (some values will be
// mutable objects (e.g. FileList)), then update the form accordingly...
// either use proxy or make diffing algo that work with mutable values
