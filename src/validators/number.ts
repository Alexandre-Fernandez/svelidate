import { createValidator } from "./utils"

export const number = {
	greaterThan(number: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value > number
		})
	},
	greaterThanorEqualTo(number: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value >= number
		})
	},
	lesserThan(number: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value < number
		})
	},
	lesserThanOrEqualTo(number: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value <= number
		})
	},
	inInterval(min: number, max: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value >= min && value <= max
		})
	},
	outOfInterval(min: number, max: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value < min && value > max
		})
	},
	differentFrom(number: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value !== number
		})
	},
	equalTo(number: number) {
		return createValidator(value => {
			if (typeof value !== "number") return false
			return value === number
		})
	},
}
