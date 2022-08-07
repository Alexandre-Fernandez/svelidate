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
		const getThresholdDate = createDateValidatorGetter(thresholdDate)

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
				})
		)
	},
	gte(thresholdDate: Date | ValidatorGetterParam) {
		const getThresholdDate = createDateValidatorGetter(thresholdDate)

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
				})
		)
	},
	lt(thresholdDate: Date | ValidatorGetterParam) {
		const getThresholdDate = createDateValidatorGetter(thresholdDate)

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
				})
		)
	},
	lte(thresholdDate: Date | ValidatorGetterParam) {
		const getThresholdDate = createDateValidatorGetter(thresholdDate)

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
				})
		)
	},
	inside(min: Date | ValidatorGetterParam, max: Date | ValidatorGetterParam) {
		const getMin = createDateValidatorGetter(min)
		const getMax = createDateValidatorGetter(max)

		return createDateValidatorWrapperFactory(
			value => min <= value && value <= max,
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(getMin(form), dateInput),
						max: getFormattedDate(getMax(form), dateInput),
					}),
				})
		)
	},
	outside(
		min: Date | ValidatorGetterParam,
		max: Date | ValidatorGetterParam
	) {
		const getMin = createDateValidatorGetter(min)
		const getMax = createDateValidatorGetter(max)

		return createDateValidatorWrapperFactory(
			(value, form) => value < getMin(form) || value > getMax(form)
		)
	},
	neq(thresholdDate: Date | ValidatorGetterParam) {
		const getThresholdDate = createDateValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			(value, form) => value !== getThresholdDate(form)
		)
	},
	eq(thresholdDate: Date | ValidatorGetterParam) {
		const getThresholdDate = createDateValidatorGetter(thresholdDate)

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
				})
		)
	},
}

export default date
