import type {
	SvelidateForm,
	UninitializedForm,
	Subscriber,
	SvelidateField,
} from "../types"

export function getFormFieldValues<F extends UninitializedForm>(
	form: SvelidateForm<F>
) {
	const values = {} as Record<PropertyKey, unknown>
	forEachFormField(form, (formField, key) => {
		values[key] = formField.value
	})
	return values
}

export function forEachFormField<F extends UninitializedForm>(
	form: SvelidateForm<F>,
	callback: (formField: Required<SvelidateField>, key: string) => void
) {
	for (const key in form) {
		if (isFormStateKey(key)) continue
		callback(form[key], key)
	}
}

export function isFormStateKey(key: string) {
	return key && key[0] === "$" ? true : false
}

export function getParentForm(input: HTMLInputElement) {
	let current: HTMLElement | null = input
	while (current !== null) {
		if (current.tagName === "FORM") {
			return current as HTMLFormElement
		}
		current = current.parentElement
	}
	return null
}

export function storeDispatch<F extends UninitializedForm>(
	to: Subscriber[],
	form: SvelidateForm<F>
) {
	to.forEach(subscriber => subscriber(form))
}
