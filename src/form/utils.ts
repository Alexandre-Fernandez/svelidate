import { $Form, Form, FormField, Naked$Form, Subscriber } from "../types"

export function getFormFieldValues<F extends Form>(form: $Form<F>) {
	const values = {} as Record<PropertyKey, unknown>
	forEachFormField(form, (formField, key) => {
		values[key] = formField.value
	})
	return values
}

export function forEachFormField<F extends Form>(
	form: $Form<F>,
	callback: (formField: Required<FormField>, key: string) => void
) {
	for (const key in form) {
		if (isFormStateKey(key)) continue
		callback(form[key], key)
	}
}

export function createNaked$Form<F extends Form>(form: F) {
	return Object.entries(form).reduce((prev, [key, value]) => {
		const formField: Required<FormField> = {
			errors: [],
			touched: false,
			validators: [],
			invalid: false,
			...value,
		}
		return {
			...prev,
			[key]: formField,
		}
	}, {} as Naked$Form<F>)
}

export function isFormStateKey(key: string) {
	return key && key[0] === "$" ? true : false
}

export function dispatch<F extends Form>(to: Subscriber[], form: $Form<F>) {
	to.forEach(subscriber => subscriber(form))
}
