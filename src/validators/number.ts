import { createNumberValidatorWrapperFactory } from "./factories"
import { getMatchingHtmlValidator } from "./helpers"

const number = {
	required: createNumberValidatorWrapperFactory(
		() => true, // valid if parsed
		inputType =>
			getMatchingHtmlValidator(inputType, {
				numbers: () => ({
					required: true,
				}),
			})
	),
	gt(thresholdNumber: number) {
		return createNumberValidatorWrapperFactory(
			value => value > thresholdNumber,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: thresholdNumber + 1 }),
				})
		)
	},
	gte(thresholdNumber: number) {
		return createNumberValidatorWrapperFactory(
			value => value >= thresholdNumber,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: thresholdNumber }),
				})
		)
	},
	lt(thresholdNumber: number) {
		return createNumberValidatorWrapperFactory(
			value => value < thresholdNumber,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: thresholdNumber - 1 }),
				})
		)
	},
	lte(thresholdNumber: number) {
		return createNumberValidatorWrapperFactory(
			value => value <= thresholdNumber,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: thresholdNumber }),
				})
		)
	},
	inside(min: number, max: number) {
		return createNumberValidatorWrapperFactory(
			value => value >= min && value <= max,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min, max }),
				})
		)
	},
	outside(min: number, max: number) {
		return createNumberValidatorWrapperFactory(
			value => value < min && value > max
		)
	},
	neq(thresholdNumber: number) {
		return createNumberValidatorWrapperFactory(
			value => value !== thresholdNumber
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

export default number
