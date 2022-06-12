import { JsValidatorPredicate, ValidatorCollection } from "../../types"

export function createConditionalValidatorCollection(
	condition: JsValidatorPredicate,
	validator: ValidatorCollection
): ValidatorCollection {
	return {
		js: (value: unknown) => {
			const result = condition(value)
			if (condition(value)) return validator.js(value)
			return undefined
		},
		html: validator.html,
	}
}
