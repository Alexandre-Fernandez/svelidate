import type { SvelidateInputType } from "../../html"

export type JsValidator<T = unknown> = (value: T) => string | undefined

export type JsValidatorPredicate<T = unknown> = (value: T) => boolean

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
> = (inputType?: T) => HtmlValidator

export type ValidatorWrapper<
	T = unknown,
	I extends SvelidateInputType = SvelidateInputType
> = Readonly<{
	js: JsValidator<T>
	html: HtmlValidatorMapper<I>
}>
