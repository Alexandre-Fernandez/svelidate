import {
	HtmlDateTimeInputType,
	SvelidateInputType,
	HtmlNumberInput,
	HtmlStringInput,
	HtmlPseudoInputType,
	HtmlValidatorMapper,
	HtmlValidator,
} from "../types"

type MapperMapFunction<T extends HtmlValidatorMapper<any>> = (
	inputType: NonNullable<Parameters<T>[0]>
) => ReturnType<T>
type HtmlValidatorMapperMap = {
	textarea: MapperMapFunction<HtmlValidatorMapper<HtmlPseudoInputType>>
	numbers: MapperMapFunction<HtmlValidatorMapper<HtmlNumberInput>>
	dates: MapperMapFunction<HtmlValidatorMapper<HtmlDateTimeInputType>>
	strings: MapperMapFunction<HtmlValidatorMapper<HtmlStringInput>>
}
const inputGroupMap: {
	[K in keyof HtmlValidatorMapperMap]: NonNullable<
		Parameters<Required<HtmlValidatorMapperMap>[K]>[0]
	>[]
} = {
	textarea: ["textarea"],
	numbers: ["number", "range"],
	dates: ["date", "datetime-local", "month", "time", "week"],
	strings: ["email", "password", "search", "tel", "text", "url"],
}

export function getMatchingHtmlValidator(
	inputType: SvelidateInputType | undefined,
	htmlValidatorMapperMap: Partial<HtmlValidatorMapperMap>
): HtmlValidator {
	if (!inputType) return {}
	for (const group in inputGroupMap) {
		const g = group as keyof typeof inputGroupMap
		if (inputGroupMap[g].some(type => type === inputType)) {
			// FIXME Type 'string' is not assignable to type 'never' (`inputType as never`)
			return htmlValidatorMapperMap[g]?.(inputType as never) ?? {}
		}
	}
	return {}
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
