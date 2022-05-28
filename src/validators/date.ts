import { createDateValidator, createValidator, getDate } from "./utils"

export const date = {
	afterThe(date: Date) {
		return createDateValidator(value => value > date)
	},
	afterTheOrEqualTo(date: Date) {
		return createDateValidator(value => value >= date)
	},
	beforeThe(date: Date) {
		return createDateValidator(value => value < date)
	},
	beforeTheOrEqualTo(date: Date) {
		return createDateValidator(value => value <= date)
	},
	inRange(min: Date, max: Date) {
		return createDateValidator(value => min <= value && value <= max)
	},
	outOfRange(min: Date, max: Date) {
		return createDateValidator(value => value < min || value > max)
	},
	differentFrom(date: Date) {
		return createDateValidator(value => value !== date)
	},
	equalTo(date: Date) {
		return createDateValidator(value => value === date)
	},
}
