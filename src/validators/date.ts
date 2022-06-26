import { getExcludedDate, getFormattedDate } from "../utilities"
import { createDateValidatorWrapperFactory } from "./factories"
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
	gt(thresholdDate: Date) {
		return createDateValidatorWrapperFactory(
			value => value > thresholdDate,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							thresholdDate,
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
	gte(thresholdDate: Date) {
		return createDateValidatorWrapperFactory(
			value => value >= thresholdDate,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(thresholdDate, dateInput),
					}),
				})
		)
	},
	lt(thresholdDate: Date) {
		return createDateValidatorWrapperFactory(
			value => value < thresholdDate,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							thresholdDate,
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
	lte(thresholdDate: Date) {
		return createDateValidatorWrapperFactory(
			value => value <= thresholdDate,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						max: getFormattedDate(thresholdDate, dateInput),
					}),
				})
		)
	},
	inside(min: Date, max: Date) {
		return createDateValidatorWrapperFactory(
			value => min <= value && value <= max,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(min, dateInput),
						max: getFormattedDate(max, dateInput),
					}),
				})
		)
	},
	outside(min: Date, max: Date) {
		return createDateValidatorWrapperFactory(
			value => value < min || value > max
		)
	},
	neq(thresholdDate: Date) {
		return createDateValidatorWrapperFactory(
			value => value !== thresholdDate
		)
	},
	eq(thresholdDate: Date) {
		return createDateValidatorWrapperFactory(
			value => value === thresholdDate,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(thresholdDate, dateInput),
						max: getFormattedDate(thresholdDate, dateInput),
					}),
				})
		)
	},
}

export default date
