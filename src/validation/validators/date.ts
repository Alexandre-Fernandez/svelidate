import { HtmlDateTimeInputType } from "../../types"
import { getExcludedDate, getFormattedDate } from "../../utilities/date"
import { getMatchingHtmlValidator, isDateInput } from "../../utilities/input"
import { createDateValidatorCollectionFactory } from "../factories/validatorCollectionFactory"

const date = {
	gt(date: Date) {
		return createDateValidatorCollectionFactory(
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
		return createDateValidatorCollectionFactory(
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
		return createDateValidatorCollectionFactory(
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
		return createDateValidatorCollectionFactory(
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
		return createDateValidatorCollectionFactory(
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
		return createDateValidatorCollectionFactory(
			value => value < min || value > max
		)
	},
	neq(date: Date) {
		return createDateValidatorCollectionFactory(value => value !== date)
	},
	eq(date: Date) {
		return createDateValidatorCollectionFactory(
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
