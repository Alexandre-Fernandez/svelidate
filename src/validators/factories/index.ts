import type { UnknownSvelidateForm } from "$src/types/svelidate/core/output"
import type {
	HtmlValidatorMapper,
	JsValidatorPredicate,
	ValidatorGetterParam,
	ValidatorWrapper,
} from "../../types/svelidate/validators"
import { getDate } from "../../utilities"

export function createValidatorWrapperFactory(
	jsValidatorPredicate: JsValidatorPredicate,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorWrapper =>
		Object.freeze({
			js: (form, value) => {
				if (jsValidatorPredicate(form, value)) return undefined // no error
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
			js: (value, form) => {
				if (jsValidatorPredicate(!!value, form)) return undefined // no error
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
			js: (value, form) => {
				const string =
					typeof value === "string"
						? value
						: (value as any)?.toString()
				if (typeof string !== "string") return error
				if (jsValidatorPredicate(string, form)) return undefined // no error
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
			js: (value, form) => {
				const number =
					typeof value === "number"
						? value
						: parseFloat(String(value))
				if (Number.isNaN(number)) return error
				if (jsValidatorPredicate(number, form)) return undefined // no error
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
			js: (value, form) => {
				const date = getDate(value)
				if (!date) return error
				if (jsValidatorPredicate(date, form)) return undefined // no error
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
			js: (value, form) => {
				try {
					if (!(value instanceof FileList)) return error
					if (jsValidatorPredicate(value, form)) return undefined
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
		js: (value, form) => {
			if (condition(value, form)) return validator.js(value, form)
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

export function createValidatorGetter<T>(
	value: T extends Function ? never : T | ValidatorGetterParam,
	resultValidator: (valueFunctionResult: unknown) => boolean,
	resultFailedValue: T extends Function ? never : T
) {
	if (typeof value === "function") {
		return (svelidateForm: UnknownSvelidateForm) => {
			const result = value(svelidateForm)
			if (!resultValidator(result)) return resultFailedValue
			return result as T extends Function ? never : T
		}
	}
	return () => value as T extends Function ? never : T
}

export function createStringValidatorGetter(
	value: string | ValidatorGetterParam
) {
	return createValidatorGetter(
		value,
		result => typeof result === "string",
		""
	)
}

export function createNumberValidatorGetter(
	value: number | ValidatorGetterParam
) {
	return createValidatorGetter(
		value,
		result => typeof result === "number",
		-1
	)
}

export function createDateValidatorGetter(value: Date | ValidatorGetterParam) {
	return createValidatorGetter(
		value,
		result => result instanceof Date,
		new Date(0)
	)
}
