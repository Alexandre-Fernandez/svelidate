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
		const [getRegex, wasValue] = createValidatorGetter(
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
				}),
			wasValue
		)
	},
	eq(str: string | ValidatorGetterParam) {
		const [getString, wasValue] = createStringValidatorGetter(str)

		return createStringValidatorWrapperFactory(
			(value, form) => value === getString(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?=^${getString(form)}$)`,
					}),
				}),
			wasValue
		)
	},
	neq(str: string | ValidatorGetterParam) {
		const [getString, wasValue] = createStringValidatorGetter(str)

		return createStringValidatorWrapperFactory(
			(value, form) => value !== getString(form),
			(inputType, form) =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?!${getString(form)}$)`,
					}),
				}),
			wasValue
		)
	},
	length: {
		gt(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

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
					}),
				wasValue
			)
		},
		gte(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

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
					}),
				wasValue
			)
		},
		lt(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

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
					}),
				wasValue
			)
		},
		lte(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

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
					}),
				wasValue
			)
		},
		inside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const [getMin, wasMinValue] = createNumberValidatorGetter(min)
			const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

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
					}),
				wasMinValue && wasMaxValue
			)
		},
		outside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const [getMin, wasMinValue] = createNumberValidatorGetter(min)
			const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

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
					}),
				wasMinValue && wasMaxValue
			)
		},
		neq(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

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
					}),
				wasValue
			)
		},
		eq(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

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
					}),
				wasValue
			)
		},
	},
}

export default string
