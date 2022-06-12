import {
	ValidatorCollection,
	JsValidatorPredicate,
	HtmlValidator,
} from "../../types"
import { getDate } from "../../utilities/date"

export function createValidatorCollectionFactory(
	jsValidatorPredicate: JsValidatorPredicate,
	htmlValidator: HtmlValidator = () => ({})
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
	htmlValidator: HtmlValidator = () => ({})
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
	htmlValidator: HtmlValidator = () => ({})
) {
	return (error = ""): ValidatorCollection =>
		Object.freeze({
			js: value => {
				if (typeof value !== "number") return error
				if (jsValidatorPredicate(value)) return undefined // no error
				return error
			},
			html: htmlValidator,
		})
}

export function createDateValidatorCollectionFactory(
	jsValidatorPredicate: JsValidatorPredicate<Date>,
	htmlValidator: HtmlValidator = () => ({})
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
