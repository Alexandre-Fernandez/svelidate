import { FormFieldValidator } from "../types"

export function createValidator(
	callback: (value: unknown) => boolean,
	defaultErrorMessage = ""
) {
	return (errorMessage = defaultErrorMessage): FormFieldValidator =>
		(value: unknown) => {
			if (callback(value)) return undefined // no error
			return errorMessage
		}
}

export function getDate(value: unknown) {
	const date = typeof value === "string" ? new Date(value) : value
	if (!(date instanceof Date)) return undefined
	if (isNaN(date.getTime())) return undefined
	return date
}
