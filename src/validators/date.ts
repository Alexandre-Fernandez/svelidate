import { getExcludedDate, getFormattedDate } from "../utilities"
import {
	createDateValidatorWrapperFactory,
	createValidatorGetter,
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
	gt(thresholdDate: Date | (() => Date)) {
		const getThresholdDate = createValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			value => value > getThresholdDate(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							getThresholdDate(),
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
	gte(thresholdDate: Date | (() => Date)) {
		const getThresholdDate = createValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			value => value >= getThresholdDate(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(getThresholdDate(), dateInput),
					}),
				})
		)
	},
	lt(thresholdDate: Date | (() => Date)) {
		const getThresholdDate = createValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			value => value < getThresholdDate(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							getThresholdDate(),
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
	lte(thresholdDate: Date | (() => Date)) {
		const getThresholdDate = createValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			value => value <= getThresholdDate(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						max: getFormattedDate(getThresholdDate(), dateInput),
					}),
				})
		)
	},
	inside(min: Date | (() => Date), max: Date | (() => Date)) {
		const getMin = createValidatorGetter(min)
		const getMax = createValidatorGetter(max)

		return createDateValidatorWrapperFactory(
			value => min <= value && value <= max,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(getMin(), dateInput),
						max: getFormattedDate(getMax(), dateInput),
					}),
				})
		)
	},
	outside(min: Date | (() => Date), max: Date | (() => Date)) {
		const getMin = createValidatorGetter(min)
		const getMax = createValidatorGetter(max)

		return createDateValidatorWrapperFactory(
			value => value < getMin() || value > getMax()
		)
	},
	neq(thresholdDate: Date | (() => Date)) {
		const getThresholdDate = createValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			value => value !== getThresholdDate()
		)
	},
	eq(thresholdDate: Date | (() => Date)) {
		const getThresholdDate = createValidatorGetter(thresholdDate)

		return createDateValidatorWrapperFactory(
			value => value === getThresholdDate(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(getThresholdDate(), dateInput),
						max: getFormattedDate(getThresholdDate(), dateInput),
					}),
				})
		)
	},
}

export default date
