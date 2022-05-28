import { FormFieldValidator } from "../types"

export function getDate(value: unknown) {
	const date = typeof value === "string" ? new Date(value) : value
	if (!(date instanceof Date)) return undefined
	if (isNaN(date.getTime())) return undefined
	return date
}

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

export function createStringValidator(
	callback: (value: string) => boolean,
	defaultErrorMessage = ""
) {
	return (errorMessage = defaultErrorMessage): FormFieldValidator =>
		(value: unknown) => {
			if (typeof value !== "string") return errorMessage
			if (callback(value)) return undefined // no error
			return errorMessage
		}
}

export function createNumberValidator(
	callback: (value: number) => boolean,
	defaultErrorMessage = ""
) {
	return (errorMessage = defaultErrorMessage): FormFieldValidator =>
		(value: unknown) => {
			if (typeof value !== "number") return errorMessage
			if (callback(value)) return undefined // no error
			return errorMessage
		}
}

export function createDateValidator(
	callback: (value: Date) => boolean,
	defaultErrorMessage = ""
) {
	return (errorMessage = defaultErrorMessage): FormFieldValidator =>
		(value: unknown) => {
			const date = typeof value === "string" ? new Date(value) : value
			if (!(date instanceof Date)) return errorMessage
			if (isNaN(date.getTime())) return errorMessage
			if (callback(date)) return undefined // no error
			return errorMessage
		}
}
