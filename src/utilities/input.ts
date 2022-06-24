import type {
	HtmlDateTimeInputType,
	SvelidateInputType,
	HtmlNumberInputType,
	HtmlStringInputType,
	HtmlPseudoInputType,
	HtmlValidatorMapper,
	HtmlValidator,
	HtmlFileInputType,
	HtmlCheckboxInputType,
} from "../types"

type MapperMapFunction<T extends HtmlValidatorMapper<any>> = (
	inputType: NonNullable<Parameters<T>[0]>
) => ReturnType<T>
type HtmlValidatorMapperMap = {
	textarea: MapperMapFunction<
		HtmlValidatorMapper<Extract<HtmlPseudoInputType, "textarea">>
	>
	file: MapperMapFunction<HtmlValidatorMapper<HtmlFileInputType>>
	checkbox: MapperMapFunction<HtmlValidatorMapper<HtmlCheckboxInputType>>
	numbers: MapperMapFunction<HtmlValidatorMapper<HtmlNumberInputType>>
	dates: MapperMapFunction<HtmlValidatorMapper<HtmlDateTimeInputType>>
	strings: MapperMapFunction<HtmlValidatorMapper<HtmlStringInputType>>
}
const inputGroupMap: {
	[K in keyof HtmlValidatorMapperMap]: NonNullable<
		Parameters<Required<HtmlValidatorMapperMap>[K]>[0]
	>[]
} = {
	textarea: ["textarea"],
	file: ["file"],
	numbers: ["number", "range"],
	dates: ["date", "datetime-local", "month", "time", "week"],
	strings: ["email", "password", "search", "tel", "text", "url"],
	checkbox: ["checkbox"],
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
