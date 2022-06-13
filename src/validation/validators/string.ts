import { getMatchingHtmlValidator } from "../../utilities/input"
import { createStringValidatorCollectionFactory } from "../factories/validatorCollectionFactory"

const $config = {
	pattern: {
		symbol: "[!\"#\\$%&'\\(\\)\\*\\+,-\\.\\/: ;<=>\\?@\\[\\]\\^_`}{~\\|\\\\]", // !"#$%&'()*+,-./: ;<=>?@[\\]^_`{|}~
		email: "[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z]+",
	},
}

const string = {
	email: createStringValidatorCollectionFactory(
		value => new RegExp($config.pattern.email).test(value),
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: {
					lookahead: `(?=^${$config.pattern.email}$)`,
					minLength: 5,
				},
				textarea: {
					minLength: 5,
				},
			})
	),
	upperCase: createStringValidatorCollectionFactory(
		value => value.toLowerCase() !== value,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: {
					lookahead: "(?=.*[A-Z])",
				},
			})
	),
	lowerCase: createStringValidatorCollectionFactory(
		value => value.toUpperCase() !== value,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: {
					lookahead: "(?=.*[a-z])",
				},
			})
	),
	number: createStringValidatorCollectionFactory(
		value => new RegExp("[0-9]").test(value),
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: {
					lookahead: "(?=.*[0-9])",
				},
			})
	),
	symbol: createStringValidatorCollectionFactory(
		value => new RegExp($config.pattern.symbol).test(value),
		inputType =>
			getMatchingHtmlValidator(inputType, {
				strings: {
					lookahead: `(?=.*${$config.pattern.symbol})`,
				},
			})
	),
	regex(regex: RegExp) {
		return createStringValidatorCollectionFactory(
			value => regex.test(value),
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: {
						lookahead: `(?=.*${regex.source})`,
					},
				})
		)
	},
	eq(string: string) {
		return createStringValidatorCollectionFactory(
			value => value === string,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: {
						lookahead: `(?=^${string}$)`,
					},
				})
		)
	},
	neq(string: string) {
		return createStringValidatorCollectionFactory(
			value => value !== string,
			inputType =>
				getMatchingHtmlValidator(inputType, {
					strings: {
						lookahead: `(?!${string}$)`,
					},
				})
		)
	},
	length: {
		gt(length: number) {
			return createStringValidatorCollectionFactory(
				value => value.length > length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							minLength: Math.floor(length) + 1,
						},
						textarea: {
							minLength: Math.floor(length) + 1,
						},
					})
			)
		},
		gte(length: number) {
			return createStringValidatorCollectionFactory(
				value => value.length >= length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							minLength: Math.floor(length),
						},
						textarea: {
							minLength: Math.floor(length),
						},
					})
			)
		},
		lt(length: number) {
			return createStringValidatorCollectionFactory(
				value => value.length < length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							maxLength: Math.floor(length) - 1,
						},
						textarea: {
							maxLength: Math.floor(length) - 1,
						},
					})
			)
		},
		lte(length: number) {
			return createStringValidatorCollectionFactory(
				value => value.length <= length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							maxLength: Math.floor(length),
						},
						textarea: {
							maxLength: Math.floor(length),
						},
					})
			)
		},
		inside(min: number, max: number) {
			return createStringValidatorCollectionFactory(
				value => value.length >= min && value.length <= max,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							minLength: Math.floor(min),
							maxLength: Math.floor(max),
						},
						textarea: {
							minLength: Math.floor(min),
							maxLength: Math.floor(max),
						},
					})
			)
		},
		outside(min: number, max: number) {
			return createStringValidatorCollectionFactory(
				value => value.length < min && value.length > max,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							lookahead: `
							(?=(.{0,${Math.floor(min)}}|.{${Math.floor(max)},})$)`,
						},
					})
			)
		},
		neq(length: number) {
			const min = Math.max(Math.floor(length) - 1, 0)
			const max = Math.floor(length) + 1
			return createStringValidatorCollectionFactory(
				value => value.length !== length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							lookahead: `
							(?=(.{0,${Math.floor(min)}}|.{${Math.floor(max)},})$)`,
						},
					})
			)
		},
		eq(length: number) {
			return createStringValidatorCollectionFactory(
				value => value.length === length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: {
							minLength: Math.floor(length),
							maxLength: Math.floor(length),
						},
						textarea: {
							minLength: Math.floor(length),
							maxLength: Math.floor(length),
						},
					})
			)
		},
	},
}

export default string
