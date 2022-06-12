import { HtmlDateTimeInput } from "../../types"
import {
	getDate,
	getExcludedDate,
	getFormattedDate,
} from "../../utilities/date"
import {
	isDateInput,
	isNumberInput,
	isStringInput,
} from "../../utilities/input"
import { createValidatorCollectionFactory } from "../factories/validatorCollectionFactory"

const general = {
	truthy: createValidatorCollectionFactory(
		value => !!value,
		() => ({})
	),
	falsy: createValidatorCollectionFactory(
		value => !value,
		inputType => {
			if (isStringInput(inputType)) {
				return {
					lookahead: "(?=^$)",
				}
			} else if (isNumberInput(inputType)) {
				return {
					min: 0,
					max: 0,
				}
			} else if (isDateInput(inputType)) {
				const date = new Date()
				const input = inputType as HtmlDateTimeInput
				return {
					min: getFormattedDate(
						getExcludedDate(date, input, "+"),
						input
					),
					max: getFormattedDate(
						getExcludedDate(date, input, "-"),
						input
					),
				}
			} else return {}
		}
	),
	required: createValidatorCollectionFactory(
		value => {
			if (!value && value !== 0) return false
			return true
		},
		() => ({
			required: true,
		})
	),
	eq(value: unknown) {
		const parsedString = String(value)
		const parsedFloat = isNaN(parseFloat(parsedString))
			? undefined
			: parseFloat(parsedString)
		return createValidatorCollectionFactory(
			val => val === value,
			inputType => {
				if (isStringInput(inputType)) {
					return {
						lookahead: `(?=^${parsedString}$)`,
					}
				} else if (isNumberInput(inputType)) {
					return {
						min: parsedFloat,
						max: parsedFloat,
					}
				} else if (isDateInput(inputType)) {
					const date = getDate(value)
					if (!date) return {}
					const input = inputType as HtmlDateTimeInput
					return {
						min: getFormattedDate(date, input),
						max: getFormattedDate(date, input),
					}
				} else return {}
			}
		)
	},
	neq(value: any) {
		return createValidatorCollectionFactory(
			val => val !== value,
			inputType => {
				if (isStringInput(inputType)) {
					return {
						lookahead: `(?!${value}$)`,
					}
				} else return {}
			}
		)
	},
}

export default general
