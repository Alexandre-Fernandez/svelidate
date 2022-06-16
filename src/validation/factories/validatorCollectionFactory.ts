import type {
	ValidatorCollection,
	JsValidatorPredicate,
	HtmlValidatorMapper,
} from "../../types"
import { getDate } from "../../utilities/date"

export function createValidatorCollectionFactory(
	jsValidatorPredicate: JsValidatorPredicate,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorCollection =>
		Object.freeze({
			js: value => {
				if (jsValidatorPredicate(value)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createStringValidatorCollectionFactory(
	jsValidatorPredicate: JsValidatorPredicate<string>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorCollection =>
		Object.freeze({
			js: value => {
				if (typeof value !== "string") return error
				if (jsValidatorPredicate(value)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createNumberValidatorCollectionFactory(
	jsValidatorPredicate: JsValidatorPredicate<number>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorCollection =>
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

export function createDateValidatorCollectionFactory(
	jsValidatorPredicate: JsValidatorPredicate<Date>,
	htmlValidator: HtmlValidatorMapper = () => ({})
) {
	return (error = ""): ValidatorCollection =>
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
