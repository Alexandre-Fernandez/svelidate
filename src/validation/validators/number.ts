import { isNumberInput } from "../../utilities/input"
import { createNumberValidatorCollectionFactory } from "../factories/validatorCollectionFactory"

const number = {
	gt(number: number) {
		return createNumberValidatorCollectionFactory(
			value => value > number,
			inputType => (isNumberInput(inputType) ? { min: number + 1 } : {})
		)
	},
	gte(number: number) {
		return createNumberValidatorCollectionFactory(
			value => value >= number,
			inputType => (isNumberInput(inputType) ? { min: number } : {})
		)
	},
	lt(number: number) {
		return createNumberValidatorCollectionFactory(
			value => value < number,
			inputType => (isNumberInput(inputType) ? { max: number - 1 } : {})
		)
	},
	lte(number: number) {
		return createNumberValidatorCollectionFactory(
			value => value <= number,
			inputType => (isNumberInput(inputType) ? { max: number } : {})
		)
	},
	inside(min: number, max: number) {
		return createNumberValidatorCollectionFactory(
			value => value >= min && value <= max,
			inputType => (isNumberInput(inputType) ? { min, max } : {})
		)
	},
	outside(min: number, max: number) {
		return createNumberValidatorCollectionFactory(
			value => value < min && value > max
		)
	},
	neq(number: number) {
		return createNumberValidatorCollectionFactory(value => value !== number)
	},
	eq(number: number) {
		return createNumberValidatorCollectionFactory(
			value => value === number,
			inputType =>
				isNumberInput(inputType) ? { min: number, max: number } : {}
		)
	},
}

export default number
