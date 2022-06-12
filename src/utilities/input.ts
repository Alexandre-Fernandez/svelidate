import {
	HtmlDateTimeInput,
	HtmlInputType,
	HtmlNumberInput,
	HtmlStringInput,
} from "../types"

const input: { [key: string]: HtmlInputType[] } = {
	numbers: ["number", "range"] as HtmlNumberInput[],
	date: [
		"date",
		"datetime-local",
		"month",
		"time",
		"week",
	] as HtmlDateTimeInput[],
	string: [
		"email",
		"password",
		"search",
		"tel",
		"text",
		"url",
	] as HtmlStringInput[],
}

export function isNumberInput(inputType: HtmlInputType) {
	return input.numbers.includes(inputType)
}

export function isDateInput(inputType: HtmlInputType) {
	return input.date.includes(inputType)
}

export function isStringInput(inputType: HtmlInputType) {
	return input.string.includes(inputType)
}
