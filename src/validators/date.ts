import { createValidator, getDate } from "./utils"

export const date = {
	afterThe(date: Date) {
		return createValidator(value => {
			const val = getDate(value)
			if (!val) return false
			return val > date
		})
	},
	afterTheOrEqualTo(date: Date) {
		return createValidator(value => {
			const val = getDate(value)
			if (!val) return false
			return val >= date
		})
	},
	beforeThe(date: Date) {
		return createValidator(value => {
			const val = getDate(value)
			if (!val) return false
			return val < date
		})
	},
	beforeTheOrEqualTo(date: Date) {
		return createValidator(value => {
			const val = getDate(value)
			if (!val) return false
			return val <= date
		})
	},
	inRange(min: Date, max: Date) {
		return createValidator(value => {
			const date = getDate(value)
			if (!date) return false
			return min <= date && date <= max
		})
	},
	outOfRange(min: Date, max: Date) {
		return createValidator(value => {
			const date = getDate(value)
			if (!date) return false
			return date < min || date > max
		})
	},
	differentFrom(date: Date) {
		return createValidator(value => {
			const val = getDate(value)
			if (!val) return false
			return val !== date
		})
	},
	equalTo(date: Date) {
		return createValidator(value => {
			const val = getDate(value)
			if (!val) return false
			return val === date
		})
	},
}
