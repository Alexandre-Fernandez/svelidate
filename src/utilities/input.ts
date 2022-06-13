import {
	HtmlDateTimeInputType,
	SvelidateInputType,
	HtmlNumberInput,
	HtmlStringInput,
	HtmlPseudoInputType,
} from "../types"

const inputGroup: Record<
	"numbers" | "dates" | "strings" | "textarea",
	SvelidateInputType[]
> = {
	textarea: ["textarea"] as HtmlPseudoInputType[],
	numbers: ["number", "range"] as HtmlNumberInput[],
	dates: [
		"date",
		"datetime-local",
		"month",
		"time",
		"week",
	] as HtmlDateTimeInputType[],
	strings: [
		"email",
		"password",
		"search",
		"tel",
		"text",
		"url",
	] as HtmlStringInput[],
}

export function isNumberInput(inputType: SvelidateInputType) {
	return inputGroup.numbers.includes(inputType)
}

export function isDateInput(inputType: SvelidateInputType) {
	return inputGroup.dates.includes(inputType)
}

export function isStringInput(inputType: SvelidateInputType) {
	return inputGroup.strings.includes(inputType)
}

export function isTextareaInput(inputType: SvelidateInputType) {
	return inputGroup.textarea.includes(inputType)
}

// remake function (~ get htmlvalidator)
export function mapInputTypeToGroup<
	T extends any,
	D extends any,
	K extends keyof typeof inputGroup
>(type: SvelidateInputType, map: Record<K, T>, notFound: D = {} as any) {
	for (const group in map) {
		if (inputGroup[group as K].includes(type)) return map[group]
	}
	return notFound
}
