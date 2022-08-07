import type { SvelidateInputType } from "../../html"
import type { UnknownSvelidateForm } from "../core/output"

export type JsValidator<T = unknown> = (
	value: T,
	form: UnknownSvelidateForm
) => string | undefined

export type JsValidatorPredicate<T = unknown> = (
	value: T,
	form: UnknownSvelidateForm
) => boolean

export type HtmlValidator = {
	required?: boolean
	pattern?: string
	minLength?: number
	maxLength?: number
	min?: number | string
	max?: number | string
	accept?: string
}
export type HtmlValidatorMapper<
	T extends SvelidateInputType = SvelidateInputType
> = (inputType: T | undefined, form: UnknownSvelidateForm) => HtmlValidator

export type ValidatorWrapper<
	T = unknown,
	I extends SvelidateInputType = SvelidateInputType
> = Readonly<{
	js: JsValidator<T>
	html: HtmlValidatorMapper<I>
}>

export type ValidatorGetterParam = (
	svelidateForm: UnknownSvelidateForm
) => unknown
