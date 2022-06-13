import { HtmlDateTimeInputType } from "../../types"
import { getExcludedDate, getFormattedDate } from "../../utilities/date"
import { isDateInput } from "../../utilities/input"
import { createDateValidatorCollectionFactory } from "../factories/validatorCollectionFactory"

const date = {
	gt(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value > date,
			inputType => {
				if (!inputType || !isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInputType
				const excludedDate = getExcludedDate(date, input, "+")
				if (!excludedDate) return {}
				return {
					min: getFormattedDate(
						excludedDate,
						input as HtmlDateTimeInputType
					),
				}
			}
		)
	},
	gte(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value >= date,
			inputType => {
				if (!inputType || !isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInputType
				return {
					min: getFormattedDate(date, input as HtmlDateTimeInputType),
				}
			}
		)
	},
	lt(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value < date,
			inputType => {
				if (!inputType || !isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInputType
				const excludedDate = getExcludedDate(date, input, "-")
				if (!excludedDate) return {}
				return {
					max: getFormattedDate(
						excludedDate,
						input as HtmlDateTimeInputType
					),
				}
			}
		)
	},
	lte(date: Date) {
		return createDateValidatorCollectionFactory(
			value => value <= date,
			inputType => {
				if (!inputType || !isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInputType
				return {
					max: getFormattedDate(date, input as HtmlDateTimeInputType),
				}
			}
		)
	},
	inside(min: Date, max: Date) {
		return createDateValidatorCollectionFactory(
			value => min <= value && value <= max,
			inputType => {
				if (!inputType || !isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInputType
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
				if (!inputType || !isDateInput(inputType)) return {}
				const input = inputType as HtmlDateTimeInputType
				return {
					min: getFormattedDate(date, input),
					max: getFormattedDate(date, input),
				}
			}
		)
	},
}

export default date
