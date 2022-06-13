import {
	HtmlDateTimeInputType,
	SvelidateInputType,
	HtmlNumberInput,
	HtmlStringInput,
	HtmlPseudoInputType,
	HtmlValidator,
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

export function getMatchingHtmlValidator<K extends keyof typeof inputGroup>(
	inputTypeToMatch: SvelidateInputType,
	validatorMap: Record<K, ReturnType<HtmlValidator>>
): ReturnType<HtmlValidator> {
	for (const key in validatorMap) {
		if (inputGroup[key].includes(inputTypeToMatch)) return validatorMap[key]
	}
	return {}
}
