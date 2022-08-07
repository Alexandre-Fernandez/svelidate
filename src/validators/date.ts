import type { ValidatorGetterParam } from "$src/types/svelidate/validators"
import { getExcludedDate, getFormattedDate } from "../utilities"
import {
	createDateValidatorGetter,
	createDateValidatorWrapperFactory,
} from "./factories"
import { getMatchingHtmlValidator } from "./helpers"

const date = {
	required: createDateValidatorWrapperFactory(
		() => true, // valid if parsed
		inputType =>
			getMatchingHtmlValidator(inputType, {
				dates: () => ({
					required: true,
				}),
			})
	),
	gt(thresholdDate: Date | ValidatorGetterParam) {
		const [getThresholdDate, wasValue] =
			createDateValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			(value, form) => value > getThresholdDate(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							getThresholdDate(form),
							dateInput,
							"+"
						)
						if (!excludedDate) return {}
						return {
							min: getFormattedDate(excludedDate, dateInput),
						}
					},
				}),
			wasValue
		)
	},
	gte(thresholdDate: Date | ValidatorGetterParam) {
		const [getThresholdDate, wasValue] =
			createDateValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			(value, form) => value >= getThresholdDate(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(
							getThresholdDate(form),
							dateInput
						),
					}),
				}),
			wasValue
		)
	},
	lt(thresholdDate: Date | ValidatorGetterParam) {
		const [getThresholdDate, wasValue] =
			createDateValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			(value, form) => value < getThresholdDate(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							getThresholdDate(form),
							dateInput,
							"-"
						)
						if (!excludedDate) return {}
						return {
							max: getFormattedDate(excludedDate, dateInput),
						}
					},
				}),
			wasValue
		)
	},
	lte(thresholdDate: Date | ValidatorGetterParam) {
		const [getThresholdDate, wasValue] =
			createDateValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			(value, form) => value <= getThresholdDate(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						max: getFormattedDate(
							getThresholdDate(form),
							dateInput
						),
					}),
				}),
			wasValue
		)
	},
	inside(min: Date | ValidatorGetterParam, max: Date | ValidatorGetterParam) {
		const [getMin, wasMinValue] = createDateValidatorGetter(min)
		const [getMax, wasMaxValue] = createDateValidatorGetter(max)

		return createDateValidatorWrapperFactory(
			value => min <= value && value <= max,
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(getMin(form), dateInput),
						max: getFormattedDate(getMax(form), dateInput),
					}),
				}),
			wasMinValue && wasMaxValue
		)
	},
	outside(
		min: Date | ValidatorGetterParam,
		max: Date | ValidatorGetterParam
	) {
		const [getMin, wasMinValue] = createDateValidatorGetter(min)
		const [getMax, wasMaxValue] = createDateValidatorGetter(max)

		return createDateValidatorWrapperFactory(
			(value, form) => value < getMin(form) || value > getMax(form),
			() => ({}),
			wasMinValue && wasMaxValue
		)
	},
	neq(thresholdDate: Date | ValidatorGetterParam) {
		const [getThresholdDate, wasValue] =
			createDateValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			(value, form) => value !== getThresholdDate(form),
			() => ({}),
			wasValue
		)
	},
	eq(thresholdDate: Date | ValidatorGetterParam) {
		const [getThresholdDate, wasValue] =
			createDateValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			(value, form) => value === getThresholdDate(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(
							getThresholdDate(form),
							dateInput
						),
						max: getFormattedDate(
							getThresholdDate(form),
							dateInput
						),
					}),
				}),
			wasValue
		)
	},
}

export default date
