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
		const [getThresholdNumber, wasValue] =
			createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value > getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getThresholdNumber(form) + 1 }),
				}),
			wasValue
		)
	},
	gte(thresholdNumber: number | ValidatorGetterParam) {
		const [getThresholdNumber, wasValue] =
			createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value >= getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getThresholdNumber(form) }),
				}),
			wasValue
		)
	},
	lt(thresholdNumber: number | ValidatorGetterParam) {
		const [getThresholdNumber, wasValue] =
			createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value < getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: getThresholdNumber(form) - 1 }),
				}),
			wasValue
		)
	},
	lte(thresholdNumber: number | ValidatorGetterParam) {
		const [getThresholdNumber, wasValue] =
			createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value <= getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: getThresholdNumber(form) }),
				}),
			wasValue
		)
	},
	inside(
		min: number | ValidatorGetterParam,
		max: number | ValidatorGetterParam
	) {
		const [getMin, wasMinValue] = createNumberValidatorGetter(min)
		const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

		return createNumberValidatorWrapperFactory(
			(value, form) => value >= getMin(form) && value <= getMax(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: getMin(form), max: getMax(form) }),
				}),
			wasMinValue && wasMaxValue
		)
	},
	outside(
		min: number | ValidatorGetterParam,
		max: number | ValidatorGetterParam
	) {
		const [getMin, wasMinValue] = createNumberValidatorGetter(min)
		const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

		return createNumberValidatorWrapperFactory(
			(value, form) => value < getMin(form) && value > getMax(form),
			() => ({}),
			wasMinValue && wasMaxValue
		)
	},
	neq(thresholdNumber: number | ValidatorGetterParam) {
		const [getThresholdNumber, wasValue] =
			createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value !== getThresholdNumber(form),
			() => ({}),
			wasValue
		)
	},
	eq(thresholdNumber: number | ValidatorGetterParam) {
		const [getThresholdNumber, wasValue] =
			createNumberValidatorGetter(thresholdNumber)

		return createNumberValidatorWrapperFactory(
			(value, form) => value === getThresholdNumber(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({
						min: getThresholdNumber(form),
						max: getThresholdNumber(form),
					}),
				}),
			wasValue
		)
	},
}

export default number
