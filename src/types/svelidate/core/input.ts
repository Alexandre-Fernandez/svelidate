import type {
	HtmlAutocompleteAttribute,
	HtmlInputmodeAttribute,
	HtmlInputType,
} from "../../html"
import type { ValidatorWrapper } from "../validators"

export type UninitializedFieldAttributes = {
	title?: string
	placeholder?: string
	readonly?: boolean
	step?: number | string
	size?: number
	autocomplete?: HtmlAutocompleteAttribute
	spellcheck?: boolean | "true" | "false" | null | undefined
	autocapitalize?: string | null | undefined
	autofocus?: boolean
	inputmode?: HtmlInputmodeAttribute
	tabindex?: number
}

export type UninitializedField<T = unknown> = {
	value: T
	validators?: ValidatorWrapper<T>[]
	type?: HtmlInputType
	touched?: boolean
	attributes?: UninitializedFieldAttributes
}

export type UninitializedForm = {
	[key: PropertyKey]: UninitializedField
}
