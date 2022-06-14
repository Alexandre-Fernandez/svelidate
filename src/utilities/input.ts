import {
	HtmlDateTimeInputType,
	SvelidateInputType,
	HtmlNumberInput,
	HtmlStringInput,
	HtmlPseudoInputType,
	HtmlValidatorMapper,
	HtmlValidator,
} from "../types"

type HtmlValidatorMapperMap = {
	textarea: HtmlValidatorMapper<HtmlPseudoInputType>
	numbers: HtmlValidatorMapper<HtmlNumberInput>
	dates: HtmlValidatorMapper<HtmlDateTimeInputType>
	strings: HtmlValidatorMapper<HtmlStringInput>
}
const inputGroupMap: {
	[K in keyof HtmlValidatorMapperMap]: NonNullable<
		Parameters<Required<HtmlValidatorMapperMap>[K]>[0] // TODO make function param (inputType) non nullable
	>[]
} = {
	textarea: ["textarea"],
	numbers: ["number", "range"],
	dates: ["date", "datetime-local", "month", "time", "week"],
	strings: ["email", "password", "search", "tel", "text", "url"],
}

// make htmlvalidator obj lookahead named "pattern" but make validator to make sur it's a lookahead

// returns the result of corresponding htmlvalidator (change type to make difference between htmlvalidator fn and return type)
// by running the function it allows validators (eg date ones) to process input type before returning corresponding obj
export function getMatchingHtmlValidator(
	inputType: SvelidateInputType | undefined,
	htmlValidatorMapperMap: Partial<HtmlValidatorMapperMap>
): HtmlValidator {
	if (!inputType) return {}
	for (const group in inputGroupMap) {
		const g = group as keyof HtmlValidatorMapperMap
		if (inputGroupMap[g].some(type => type === inputType)) {
			return htmlValidatorMapperMap[g]?.(inputType as any) ?? {}
		}
	}
	return {}
}

getMatchingHtmlValidator("checkbox", {
	textarea: () => ({}),
	numbers: () => ({}),
	dates: () => ({}),
})

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
