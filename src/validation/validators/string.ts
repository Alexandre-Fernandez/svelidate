import { svelidateConfig } from "../../form/config"
import { getMatchingHtmlValidator } from "../../utilities/input"
import { createStringValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

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
		value => new RegExp("[0-9]").test(value),
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
	regex(regex: RegExp) {
		return createStringValidatorWrapperFactory(
			value => regex.test(value),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?=.*${regex.source})`,
					}),
				})
		)
	},
	eq(string: string) {
		return createStringValidatorWrapperFactory(
			value => value === string,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?=^${string}$)`,
					}),
				})
		)
	},
	neq(string: string) {
		return createStringValidatorWrapperFactory(
			value => value !== string,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: () => ({
						pattern: `(?!${string}$)`,
					}),
				})
		)
	},
	length: {
		gt(length: number) {
			return createStringValidatorWrapperFactory(
				value => value.length > length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(length) + 1,
						}),
						textarea: () => ({
							minLength: Math.floor(length) + 1,
						}),
					})
			)
		},
		gte(length: number) {
			return createStringValidatorWrapperFactory(
				value => value.length >= length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(length),
						}),
						textarea: () => ({
							minLength: Math.floor(length),
						}),
					})
			)
		},
		lt(length: number) {
			return createStringValidatorWrapperFactory(
				value => value.length < length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(length) - 1,
						}),
						textarea: () => ({
							maxLength: Math.floor(length) - 1,
						}),
					})
			)
		},
		lte(length: number) {
			return createStringValidatorWrapperFactory(
				value => value.length <= length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(length),
						}),
						textarea: () => ({
							maxLength: Math.floor(length),
						}),
					})
			)
		},
		inside(min: number, max: number) {
			return createStringValidatorWrapperFactory(
				value => value.length >= min && value.length <= max,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(min),
							maxLength: Math.floor(max),
						}),
						textarea: () => ({
							minLength: Math.floor(min),
							maxLength: Math.floor(max),
						}),
					})
			)
		},
		outside(min: number, max: number) {
			return createStringValidatorWrapperFactory(
				value => value.length < min && value.length > max,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								Math.max(0, min - 1)
							)}}|.{${Math.floor(max + 1)},})$)`,
						}),
					})
			)
		},
		neq(length: number) {
			const min = Math.max(Math.floor(length) - 1, 0)
			const max = Math.floor(length) + 1
			return createStringValidatorWrapperFactory(
				value => value.length !== length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								min
							)}}|.{${Math.floor(max)},})$)`,
						}),
					})
			)
		},
		eq(length: number) {
			return createStringValidatorWrapperFactory(
				value => value.length === length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(length),
							maxLength: Math.floor(length),
						}),
						textarea: () => ({
							minLength: Math.floor(length),
							maxLength: Math.floor(length),
						}),
					})
			)
		},
	},
}

export default string
