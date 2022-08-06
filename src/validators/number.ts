import {
	createNumberValidatorWrapperFactory,
	createValidatorGetter,
} from "./factories"
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
	gt(thresholdNumber: number | (() => number)) {
		const getThresholdNumber = createValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			value => value > getThresholdNumber(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getThresholdNumber() + 1 }),
				})
		)
	},
	gte(thresholdNumber: number | (() => number)) {
		const getThresholdNumber = createValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			value => value >= getThresholdNumber(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getThresholdNumber() }),
				})
		)
	},
	lt(thresholdNumber: number | (() => number)) {
		const getThresholdNumber = createValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			value => value < getThresholdNumber(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: getThresholdNumber() - 1 }),
				})
		)
	},
	lte(thresholdNumber: number | (() => number)) {
		const getThresholdNumber = createValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			value => value <= getThresholdNumber(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: getThresholdNumber() }),
				})
		)
	},
	inside(min: number | (() => number), max: number | (() => number)) {
		const getMin = createValidatorGetter(min)
		const getMax = createValidatorGetter(max)

		return createNumberValidatorWrapperFactory(
			value => value >= getMin() && value <= getMax(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getMin(), max: getMax() }),
				})
		)
	},
	outside(min: number | (() => number), max: number | (() => number)) {
		const getMin = createValidatorGetter(min)
		const getMax = createValidatorGetter(max)

		return createNumberValidatorWrapperFactory(
			value => value < getMin() && value > getMax()
		)
	},
	neq(thresholdNumber: number | (() => number)) {
		const getThresholdNumber = createValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			value => value !== getThresholdNumber()
		)
	},
	eq(thresholdNumber: number | (() => number)) {
		const getThresholdNumber = createValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			value => value === getThresholdNumber(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({
						min: getThresholdNumber(),
						max: getThresholdNumber(),
					}),
				})
		)
	},
}

export default number
