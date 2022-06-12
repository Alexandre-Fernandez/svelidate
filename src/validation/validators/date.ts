import { HtmlDateTimeInput } from "../../types"
import { getExcludedDate, getFormattedDate } from "../../utilities/date"
import { isDateInput } from "../../utilities/input"
import { createDateValidatorCollectionFactory } from "../factories/validatorCollectionFactory"

const date = {
	gt(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value > date,
			inputType => {
				if (!isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInput
				return {
					min: getFormattedDate(
						getExcludedDate(date, input, "+"),
						input as HtmlDateTimeInput
					),
				}
			}
		)
	},
	gte(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value >= date,
			inputType => {
				if (!isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInput
				return {
					min: getFormattedDate(date, input as HtmlDateTimeInput),
				}
			}
		)
	},
	lt(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value < date,
			inputType => {
				if (!isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInput
				return {
					max: getFormattedDate(
						getExcludedDate(date, input, "-"),
						input as HtmlDateTimeInput
					),
				}
			}
		)
	},
	lte(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value <= date,
			inputType => {
				if (!isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInput
				return {
					max: getFormattedDate(date, input as HtmlDateTimeInput),
				}
			}
		)
	},
	inside(min: Date, max: Date) {
		return createDateValidatorCollectionFactory(
			value => min <= value && value <= max,
			inputType => {
				if (!isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInput
				return {
					min: getFormattedDate(min, input),
					max: getFormattedDate(max, input),
				}
			}
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
			inputType => {
				if (!isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInput
				return {
					min: getFormattedDate(date, input),
					max: getFormattedDate(date, input),
				}
			}
		)
	},
}

export default date
