import type { ValidatorGetterParam } from "$src/types/svelidate/validators"
import { svelidateConfig } from "../config"
import {
	createNumberValidatorGetter,
	createStringValidatorGetter,
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
	regex(regex: RegExp | ValidatorGetterParam) {
		const getRegex = createValidatorGetter(
			regex,
			result => result instanceof RegExp,
			/$^/
		)
		return createStringValidatorWrapperFactory(
			(value, form) => getRegex(form).test(value),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?=.*${getRegex(form).source})`,
					}),
				})
		)
	},
	eq(str: string | ValidatorGetterParam) {
		const getString = createStringValidatorGetter(str)

		return createStringValidatorWrapperFactory(
			(value, form) => value === getString(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?=^${getString(form)}$)`,
					}),
				})
		)
	},
	neq(str: string | (() => string)) {
		const getString = createStringValidatorGetter(str)

		return createStringValidatorWrapperFactory(
			(value, form) => value !== getString(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?!${getString(form)}$)`,
					}),
				})
		)
	},
	length: {
		gt(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				(value, form) => value.length > getLength(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getLength(form)) + 1,
						}),
						textarea: () => ({
							minLength: Math.floor(getLength(form)) + 1,
						}),
					})
			)
		},
		gte(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				(value, form) => value.length >= getLength(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getLength(form)),
						}),
						textarea: () => ({
							minLength: Math.floor(getLength(form)),
						}),
					})
			)
		},
		lt(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				(value, form) => value.length < getLength(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(getLength(form)) - 1,
						}),
						textarea: () => ({
							maxLength: Math.floor(getLength(form)) - 1,
						}),
					})
			)
		},
		lte(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				(value, form) => value.length <= getLength(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(getLength(form)),
						}),
						textarea: () => ({
							maxLength: Math.floor(getLength(form)),
						}),
					})
			)
		},
		inside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const getMin = createNumberValidatorGetter(min)
			const getMax = createNumberValidatorGetter(max)

			return createStringValidatorWrapperFactory(
				(value, form) =>
					value.length >= getMin(form) &&
					value.length <= getMax(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getMin(form)),
							maxLength: Math.floor(getMax(form)),
						}),
						textarea: () => ({
							minLength: Math.floor(getMin(form)),
							maxLength: Math.floor(getMax(form)),
						}),
					})
			)
		},
		outside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const getMin = createNumberValidatorGetter(min)
			const getMax = createNumberValidatorGetter(max)

			return createStringValidatorWrapperFactory(
				(value, form) =>
					value.length < getMax(form) && value.length > getMax(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								Math.max(0, getMin(form) - 1)
							)}}|.{${Math.floor(getMax(form) + 1)},})$)`,
						}),
					})
			)
		},
		neq(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				(value, form) => value.length !== getLength(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								Math.max(Math.floor(getLength(form)) - 1, 0)
							)}}|.{${Math.floor(
								Math.floor(getLength(form)) + 1
							)},})$)`,
						}),
					})
			)
		},
		eq(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createStringValidatorWrapperFactory(
				(value, form) => value.length === getLength(form),
				(inputType, form) =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(getLength(form)),
							maxLength: Math.floor(getLength(form)),
						}),
						textarea: () => ({
							minLength: Math.floor(getLength(form)),
							maxLength: Math.floor(getLength(form)),
						}),
					})
			)
		},
	},
}

export default string
