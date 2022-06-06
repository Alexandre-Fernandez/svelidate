import { createNumberValidator, createValidator } from "./utils"

export const number = {
	greaterThan(number: number) {
		return createNumberValidator(value => value > number)
	},
	greaterThanOrEqualTo(number: number) {
		return createNumberValidator(value => value >= number)
	},
	lesserThan(number: number) {
		return createNumberValidator(value => value < number)
	},
	lesserThanOrEqualTo(number: number) {
		return createNumberValidator(value => value <= number)
	},
	inInterval(min: number, max: number) {
		return createNumberValidator(value => value >= min && value <= max)
	},
	outOfInterval(min: number, max: number) {
		return createNumberValidator(value => value < min && value > max)
	},
	differentFrom(number: number) {
		return createNumberValidator(value => value !== number)
	},
	equalTo(number: number) {
		return createNumberValidator(value => value === number)
	},
}
