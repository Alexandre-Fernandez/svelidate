import {
	getDate,
	getExcludedDate,
	getFormattedDate,
} from "../../utilities/date"
import { getMatchingHtmlValidator } from "../../utilities/input"
import { createDateValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

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
	gt(date: Date) {
		return createDateValidatorWrapperFactory(
			value => value > date,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							date,
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
	gte(date: Date) {
		return createDateValidatorWrapperFactory(
			value => value >= date,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(date, dateInput),
					}),
				})
		)
	},
	lt(date: Date) {
		return createDateValidatorWrapperFactory(
			value => value < date,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => {
						const excludedDate = getExcludedDate(
							date,
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
	lte(date: Date) {
		return createDateValidatorWrapperFactory(
			value => value <= date,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						max: getFormattedDate(date, dateInput),
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
	neq(date: Date) {
		return createDateValidatorWrapperFactory(value => value !== date)
	},
	eq(date: Date) {
		return createDateValidatorWrapperFactory(
			value => value === date,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					dates: dateInput => ({
						min: getFormattedDate(date, dateInput),
						max: getFormattedDate(date, dateInput),
					}),
				})
		)
	},
}

export default date
