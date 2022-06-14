import {
	HtmlDateTimeInputType,
	SvelidateInputType,
	HtmlNumberInput,
	HtmlStringInput,
	HtmlPseudoInputType,
	HtmlValidatorMapper,
} from "../types"

type ValidatorMap = {
	textarea: HtmlValidatorMapper<HtmlPseudoInputType>
	numbers: HtmlValidatorMapper<HtmlNumberInput>
	dates: HtmlValidatorMapper<HtmlDateTimeInputType>
	strings: HtmlValidatorMapper<HtmlStringInput>
}
const inputGroupMap: {
	[K in keyof ValidatorMap]: NonNullable<Parameters<ValidatorMap[K]>[0]>[]
} = {
	textarea: ["textarea"],
	numbers: ["number", "range"],
	dates: ["date", "datetime-local", "month", "time", "week"],
	strings: ["email", "password", "search", "tel", "text", "url"],
}

// make htmlvalidator obj lookahead named "pattern" but make validator to make sur it's a lookahead

// returns the result of corresponding htmlvalidator (change type to make difference between htmlvalidator fn and return type)
// by running the function it allows validators (eg date ones) to process input type before returning corresponding obj
export function getSomething(
	inputType: SvelidateInputType | undefined,
	validatorMap: ValidatorMap
) {
	if (!inputType) return {}
}

function getInputGroup<K extends keyof typeof inputGroupMap>(
	inputType: SvelidateInputType
): keyof typeof inputGroupMap | undefined {
	for (const key in inputGroupMap) {
		if (inputGroupMap[key as K].some(type => type === inputType)) {
			return key as K
		}
	}
}

export function isNumberInput(inputType: SvelidateInputType) {
	return inputGroupMap.numbers.some(type => type === inputType)
}

export function isDateInput(inputType: SvelidateInputType) {
	return inputGroupMap.dates.some(type => type === inputType)
}

export function isStringInput(inputType: SvelidateInputType) {
	return inputGroupMap.strings.some(type => type === inputType)
}

export function isTextareaInput(inputType: SvelidateInputType) {
	return inputGroupMap.textarea.some(type => type === inputType)
}

export function getMatchingHtmlValidator<K extends keyof typeof inputGroupMap>(
	inputTypeToMatch: SvelidateInputType | undefined,
	validatorMap: Record<K, ReturnType<HtmlValidatorMapper>>
): ReturnType<HtmlValidatorMapper> {
	if (!inputTypeToMatch) return {}
	for (const key in validatorMap) {
		if (inputGroupMap[key].some(type => type === inputTypeToMatch)) {
			return validatorMap[key]
		}
	}
	return {}
}
