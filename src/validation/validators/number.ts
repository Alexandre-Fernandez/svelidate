import { getMatchingHtmlValidator } from "../../utilities/input"
import { createNumberValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

const number = {
	gt(number: number) {
		return createNumberValidatorWrapperFactory(
			value => value > number,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: number + 1 }),
				})
		)
	},
	gte(number: number) {
		return createNumberValidatorWrapperFactory(
			value => value >= number,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: number }),
				})
		)
	},
	lt(number: number) {
		return createNumberValidatorWrapperFactory(
			value => value < number,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: number - 1 }),
				})
		)
	},
	lte(number: number) {
		return createNumberValidatorWrapperFactory(
			value => value <= number,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ max: number }),
				})
		)
	},
	inside(min: number, max: number) {
		return createNumberValidatorWrapperFactory(
			value => value >= min && value <= max,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min, max }),
				})
		)
	},
	outside(min: number, max: number) {
		return createNumberValidatorWrapperFactory(
			value => value < min && value > max
		)
	},
	neq(number: number) {
		return createNumberValidatorWrapperFactory(value => value !== number)
	},
	eq(number: number) {
		return createNumberValidatorWrapperFactory(
			value => value === number,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					numbers: () => ({ min: number, max: number }),
				})
		)
	},
}

export default number
