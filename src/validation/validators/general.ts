import {
	getDate,
	getExcludedDate,
	getFormattedDate,
} from "../../utilities/date"
import { getMatchingHtmlValidator } from "../../utilities/input"
import { createValidatorCollectionFactory } from "../factories/validatorCollectionFactory"

const general = {
	truthy: createValidatorCollectionFactory(
		value => !!value,
		() => ({})
	),
	falsy: createValidatorCollectionFactory(
		value => !value,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				textarea: () => ({ minLength: 0, maxLength: 0 }),
				strings: () => ({ pattern: "(?=^$)" }),
				numbers: () => ({ min: 0, max: 0 }),
				dates: dateInput => {
					const now = new Date()
					const dates = {
						afterNow: getExcludedDate(now, dateInput, "+"),
						beforeNow: getExcludedDate(now, dateInput, "-"),
					}
					if (!dates.afterNow || !dates.beforeNow) return {}
					return {
						min: getFormattedDate(dates.afterNow, dateInput),
						max: getFormattedDate(dates.beforeNow, dateInput),
					}
				},
			})
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
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({ pattern: `(?=^${parsedString}$)` }),
					numbers: () => ({
						min: parsedFloat,
						max: parsedFloat,
					}),
					dates: dateInput => {
						const date = getDate(value)
						if (!date) return {}
						return {
							min: getFormattedDate(date, dateInput),
							max: getFormattedDate(date, dateInput),
						}
					},
				})
		)
	},
	neq(value: any) {
		return createValidatorCollectionFactory(
			val => val !== value,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({ pattern: `(?!${value}$)` }),
				})
		)
	},
}

export default general
