import { svelidateConfig } from "../config"
import {
	createStringValidatorWrapperFactory,
	createValidatorGetter,
} from "./factories"
import { getMatchingHtmlValidator } from "./helpers"

const string = {
	required: createStringValidatorWrapperFactory(
		value => value.length > 0,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					required: true,
				}),
				textarea: () => ({
					required: true,
				}),
			})
	),
	email: createStringValidatorWrapperFactory(
		value => new RegExp(svelidateConfig.pattern.email).test(value),
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: `(?=^${svelidateConfig.pattern.email}$)`,
					minLength: 5,
				}),
				textarea: () => ({
					minLength: 5,
				}),
			})
	),
	upperCase: createStringValidatorWrapperFactory(
		value => value.toLowerCase() !== value,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: "(?=.*[A-Z])",
				}),
			})
	),
	lowerCase: createStringValidatorWrapperFactory(
		value => value.toUpperCase() !== value,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: "(?=.*[a-z])",
				}),
			})
	),
	number: createStringValidatorWrapperFactory(
		value => /[0-9]/.test(value),
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: "(?=.*[0-9])",
				}),
			})
	),
	symbol: createStringValidatorWrapperFactory(
		value => new RegExp(svelidateConfig.pattern.symbol).test(value),
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: `(?=.*${svelidateConfig.pattern.symbol})`,
				}),
			})
	),
	regex(regex: RegExp | (() => RegExp)) {
		const getRegex = createValidatorGetter(regex)

		return createStringValidatorWrapperFactory(
			value => getRegex().test(value),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?=.*${getRegex().source})`,
					}),
				})
		)
	},
	eq(str: string | (() => string)) {
		const getString = createValidatorGetter(str)

		return createStringValidatorWrapperFactory(
			value => value === getString(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?=^${getString()}$)`,
					}),
				})
		)
	},
	neq(str: string | (() => string)) {
		const getString = createValidatorGetter(str)

		return createStringValidatorWrapperFactory(
			value => value !== getString(),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?!${getString()}$)`,
					}),
				})
		)
	},
	length: {
		gt(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				value => value.length > getLength(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getLength()) + 1,
						}),
						textarea: () => ({
							minLength: Math.floor(getLength()) + 1,
						}),
					})
			)
		},
		gte(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				value => value.length >= getLength(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getLength()),
						}),
						textarea: () => ({
							minLength: Math.floor(getLength()),
						}),
					})
			)
		},
		lt(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				value => value.length < getLength(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(getLength()) - 1,
						}),
						textarea: () => ({
							maxLength: Math.floor(getLength()) - 1,
						}),
					})
			)
		},
		lte(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				value => value.length <= getLength(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(getLength()),
						}),
						textarea: () => ({
							maxLength: Math.floor(getLength()),
						}),
					})
			)
		},
		inside(min: number | (() => number), max: number | (() => number)) {
			const getMin = createValidatorGetter(min)
			const getMax = createValidatorGetter(max)

			return createStringValidatorWrapperFactory(
				value => value.length >= getMin() && value.length <= getMax(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getMin()),
							maxLength: Math.floor(getMax()),
						}),
						textarea: () => ({
							minLength: Math.floor(getMin()),
							maxLength: Math.floor(getMax()),
						}),
					})
			)
		},
		outside(min: number | (() => number), max: number | (() => number)) {
			const getMin = createValidatorGetter(min)
			const getMax = createValidatorGetter(max)

			return createStringValidatorWrapperFactory(
				value => value.length < getMax() && value.length > getMax(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								Math.max(0, getMin() - 1)
							)}}|.{${Math.floor(getMax() + 1)},})$)`,
						}),
					})
			)
		},
		neq(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				value => value.length !== getLength(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								Math.max(Math.floor(getLength()) - 1, 0)
							)}}|.{${Math.floor(
								Math.floor(getLength()) + 1
							)},})$)`,
						}),
					})
			)
		},
		eq(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				value => value.length === getLength(),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getLength()),
							maxLength: Math.floor(getLength()),
						}),
						textarea: () => ({
							minLength: Math.floor(getLength()),
							maxLength: Math.floor(getLength()),
						}),
					})
			)
		},
	},
}

export default string
