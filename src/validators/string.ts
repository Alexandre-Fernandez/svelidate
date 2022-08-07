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
		(_form, value) => value.length > 0,
		(_form, inputType) =>
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
		(_form, value) => new RegExp(svelidateConfig.pattern.email).test(value),
		(_form, inputType) =>
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
		(_form, value) => value.toLowerCase() !== value,
		(_form, inputType) =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: "(?=.*[A-Z])",
				}),
			})
	),
	lowerCase: createStringValidatorWrapperFactory(
		(_form, value) => value.toUpperCase() !== value,
		(_form, inputType) =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: "(?=.*[a-z])",
				}),
			})
	),
	number: createStringValidatorWrapperFactory(
		(_form, value) => /[0-9]/.test(value),
		(_form, inputType) =>
			getMatchingHtmlValidator(inputType, {
				strings: () => ({
					pattern: "(?=.*[0-9])",
				}),
			})
	),
	symbol: createStringValidatorWrapperFactory(
		(_form, value) =>
			new RegExp(svelidateConfig.pattern.symbol).test(value),
		(_form, inputType) =>
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
			(form, value) => getRegex(form).test(value),
			(form, inputType) =>
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
			(form, value) => value === getString(form),
			(form, inputType) =>
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
			(form, value) => value !== getString(form),
			(form, inputType) =>
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
				(form, value) => value.length > getLength(form),
				(form, inputType) =>
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
				(form, value) => value.length >= getLength(form),
				(form, inputType) =>
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
				(form, value) => value.length < getLength(form),
				(form, inputType) =>
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
				(form, value) => value.length <= getLength(form),
				(form, inputType) =>
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
				(form, value) =>
					value.length >= getMin(form) &&
					value.length <= getMax(form),
				(form, inputType) =>
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
				(form, value) =>
					value.length < getMax(form) && value.length > getMax(form),
				(form, inputType) =>
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
				(form, value) => value.length !== getLength(form),
				(form, inputType) =>
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
				(form, value) => value.length === getLength(form),
				(form, inputType) =>
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
