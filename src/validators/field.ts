import { createNumberValidatorWrapperFactory } from "./factories"
import { getMatchingHtmlValidator } from "./helpers"

const field = {
	neq(fieldName: string) {
		return createNumberValidatorWrapperFactory(
			((value: any, form: any) => form[fieldName] === value) as any
		)
	},
	eq(thresholdNumber: number) {
		return createNumberValidatorWrapperFactory(
			value => value === thresholdNumber,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({
						min: thresholdNumber,
						max: thresholdNumber,
					}),
				})
		)
	},
}

/*
{
	// validator().string.symbol("err").string.length.gt(6)("err")

	string: { 
		value: "",
		validators: [field.eq("object")("Not equal to object")]
	},
	object: { value: {} as Record<string, unknown> },
}
*/

export default field
