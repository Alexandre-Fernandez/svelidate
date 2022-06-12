import {
	createNaked$Form,
	dispatch,
	forEachFormField,
	getFormFieldValues,
} from "../utilities"
import type {
	SvelidateForm,
	UninitializedForm,
	Field,
	Subscriber,
	SvelidateFormStore,
} from "../types"

export function svelidate<F extends UninitializedForm>(initialForm: F) {
	const subscribers: Subscriber[] = []

	const $form: SvelidateForm<F> = {
		...createNaked$Form(initialForm),
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
			dispatch(subscribers, newForm)
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

function updateFormField<F extends UninitializedForm>(
	formField: Required<Field>,
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
