import type {
	HtmlCheckboxInputType,
	HtmlColorInputType,
	HtmlDateTimeInputType,
	HtmlFileInputType,
	HtmlNumberInputType,
	HtmlPseudoInputType,
	HtmlRadioInputType,
	HtmlStringInputType,
	SvelidateInputType,
} from "../../types/html"
import type {
	HtmlValidator,
	HtmlValidatorMapper,
} from "../../types/svelidate/validators"

type MapperMapFunction<T extends HtmlValidatorMapper<any>> = (
	inputType: NonNullable<Parameters<T>[0]>
) => ReturnType<T>
export type HtmlValidatorMapperMap = {
	file: MapperMapFunction<HtmlValidatorMapper<HtmlFileInputType>>
	checkbox: MapperMapFunction<HtmlValidatorMapper<HtmlCheckboxInputType>>
	numbers: MapperMapFunction<HtmlValidatorMapper<HtmlNumberInputType>>
	dates: MapperMapFunction<HtmlValidatorMapper<HtmlDateTimeInputType>>
	strings: MapperMapFunction<HtmlValidatorMapper<HtmlStringInputType>>
	radio: MapperMapFunction<HtmlValidatorMapper<HtmlRadioInputType>>
	color: MapperMapFunction<HtmlValidatorMapper<HtmlColorInputType>>
	textarea: MapperMapFunction<
		HtmlValidatorMapper<Extract<HtmlPseudoInputType, "textarea">>
	>
	select: MapperMapFunction<
		HtmlValidatorMapper<
			Extract<HtmlPseudoInputType, "select-multiple" | "select-one">
		>
	>
	other: MapperMapFunction<
		HtmlValidatorMapper<
			Exclude<
				SvelidateInputType,
				| HtmlPseudoInputType
				| HtmlFileInputType
				| HtmlCheckboxInputType
				| HtmlNumberInputType
				| HtmlDateTimeInputType
				| HtmlStringInputType
				| HtmlColorInputType
				| HtmlRadioInputType
			>
		>
	>
}
const inputGroupMap: {
	[K in keyof HtmlValidatorMapperMap]: NonNullable<
		Parameters<Required<HtmlValidatorMapperMap>[K]>[0]
	>[]
} = {
	textarea: ["textarea"],
	select: ["select-multiple", "select-one"],
	color: ["color"],
	radio: ["radio"],
	file: ["file"],
	numbers: ["number", "range"],
	dates: ["date", "datetime-local", "month", "time", "week"],
	strings: ["email", "password", "search", "tel", "text", "url"],
	checkbox: ["checkbox"],
	other: ["hidden", "reset", "submit"],
}

export function getMatchingHtmlValidator(
	inputType: SvelidateInputType | undefined,
	htmlValidatorMapperMap: Partial<HtmlValidatorMapperMap>
): HtmlValidator {
	let result = {}
	if (!inputType) return result
	Object.keys(inputGroupMap).every(group => {
		const g = group as keyof typeof inputGroupMap
		if (inputGroupMap[g].some(type => type === inputType)) {
			// FIXME Type 'string' is not assignable to type 'never' (`inputType as never`)
			result = htmlValidatorMapperMap[g]?.(inputType as never) ?? {}
			return false
		}
		return true
	})
	return result
}
