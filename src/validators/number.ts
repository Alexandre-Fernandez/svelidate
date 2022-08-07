import type { ValidatorGetterParam } from "$src/types/svelidate/validators"
import {
	createNumberValidatorGetter,
	createNumberValidatorWrapperFactory,
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
	gt(thresholdNumber: number | ValidatorGetterParam) {
		const getThresholdNumber = createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value > getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getThresholdNumber(form) + 1 }),
				})
		)
	},
	gte(thresholdNumber: number | ValidatorGetterParam) {
		const getThresholdNumber = createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value >= getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getThresholdNumber(form) }),
				})
		)
	},
	lt(thresholdNumber: number | ValidatorGetterParam) {
		const getThresholdNumber = createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value < getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: getThresholdNumber(form) - 1 }),
				})
		)
	},
	lte(thresholdNumber: number | ValidatorGetterParam) {
		const getThresholdNumber = createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value <= getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: getThresholdNumber(form) }),
				})
		)
	},
	inside(
		min: number | ValidatorGetterParam,
		max: number | ValidatorGetterParam
	) {
		const getMin = createNumberValidatorGetter(min)
		const getMax = createNumberValidatorGetter(max)

		return createNumberValidatorWrapperFactory(
			(value, form) => value >= getMin(form) && value <= getMax(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getMin(form), max: getMax(form) }),
				})
		)
	},
	outside(
		min: number | ValidatorGetterParam,
		max: number | ValidatorGetterParam
	) {
		const getMin = createNumberValidatorGetter(min)
		const getMax = createNumberValidatorGetter(max)

		return createNumberValidatorWrapperFactory(
			(value, form) => value < getMin(form) && value > getMax(form)
		)
	},
	neq(thresholdNumber: number | ValidatorGetterParam) {
		const getThresholdNumber = createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value !== getThresholdNumber(form)
		)
	},
	eq(thresholdNumber: number | ValidatorGetterParam) {
		const getThresholdNumber = createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value === getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({
						min: getThresholdNumber(form),
						max: getThresholdNumber(form),
					}),
				})
		)
	},
}

export default number
