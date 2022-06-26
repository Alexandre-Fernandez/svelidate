import type {
	HtmlValidatorMapper,
	JsValidatorPredicate,
	ValidatorWrapper,
} from "../../types/svelidate/validators"
import { getDate } from "../../utilities"

export function createValidatorWrapperFactory(
	jsValidatorPredicate: JsValidatorPredicate,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorWrapper =>
		Object.freeze({
			js: value => {
				if (jsValidatorPredicate(value)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createBooleanValidatorWrapperFactory(
	jsValidatorPredicate: JsValidatorPredicate<boolean>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorWrapper =>
		Object.freeze({
			js: value => {
				if (jsValidatorPredicate(!!value)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createStringValidatorWrapperFactory(
	jsValidatorPredicate: JsValidatorPredicate<string>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorWrapper =>
		Object.freeze({
			js: value => {
				const string =
					typeof value === "string"
						? value
						: (value as any)?.toString()
				if (typeof string !== "string") return error
				if (jsValidatorPredicate(string)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createNumberValidatorWrapperFactory(
	jsValidatorPredicate: JsValidatorPredicate<number>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorWrapper =>
		Object.freeze({
			js: value => {
				const number =
					typeof value === "number"
						? value
						: parseFloat(String(value))
				if (Number.isNaN(number)) return error
				if (jsValidatorPredicate(number)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createDateValidatorWrapperFactory(
	jsValidatorPredicate: JsValidatorPredicate<Date>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorWrapper =>
		Object.freeze({
			js: value => {
				const date = getDate(value)
				if (!date) return error
				if (jsValidatorPredicate(date)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createFileListValidatorWrapperFactory(
	jsValidatorPredicate: JsValidatorPredicate<FileList>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorWrapper =>
		Object.freeze({
			js: value => {
				try {
					if (!(value instanceof FileList)) return error
					if (jsValidatorPredicate(value)) return undefined
					return error
				} catch (err) {
					return error
				}
			},
			html: htmlValidator,
		})
}

export function createConditionalValidatorWrapper(
	condition: JsValidatorPredicate,
	validator: ValidatorWrapper
): ValidatorWrapper {
	return {
		js: (value: unknown) => {
			if (condition(value)) return validator.js(value)
			return undefined
		},
		html: validator.html,
	}
}

export function validateIf<T extends ValidatorWrapper | ValidatorWrapper[]>(
	condition: JsValidatorPredicate,
	validators: T
) {
	if (Array.isArray(validators)) {
		return validators.map(validator =>
			createConditionalValidatorWrapper(condition, validator)
		) as T
	}
	return createConditionalValidatorWrapper(
		condition,
		validators as ValidatorWrapper
	) as T
}
