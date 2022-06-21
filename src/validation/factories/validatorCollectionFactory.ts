import type {
	ValidatorWrapper,
	JsValidatorPredicate,
	HtmlValidatorMapper,
} from "../../types"
import { getDate } from "../../utilities/date"

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
				if (isNaN(number)) return error
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
