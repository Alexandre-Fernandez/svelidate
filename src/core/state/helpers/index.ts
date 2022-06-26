import type { UninitializedForm } from "../../../types/svelidate/core/input"
import type {
	SvelidateField,
	SvelidateForm,
} from "../../../types/svelidate/core/output"

export function isFormStateKey(key: string) {
	return key && key[0] === "$"
}

export function forEachFormField<F extends UninitializedForm>(
	form: SvelidateForm<F>,
	callback: (formField: Required<SvelidateField>, key: string) => void
) {
	Object.keys(form).forEach(key => {
		if (isFormStateKey(key)) return
		callback(form[key], key)
	})
}

export function getFormFieldValues<F extends UninitializedForm>(
	form: SvelidateForm<F>
) {
	const values = {} as Record<PropertyKey, unknown>
	forEachFormField(form, (formField, key) => {
		values[key] = formField.value
	})
	return values
}
