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

// export function validateIf<
// 	T extends ValidatorCollection | ValidatorCollection[]
// >(predicate: JsValidatorPredicate, validators: T) {
// 	if (typeof validators === "function") {
// 		return createConditionalValidatorCollection(predicate, validators) as T
// 	}
// 	return validators.map(validator =>
// 		createConditionalValidatorCollection(predicate, validator)
// 	) as T
// }
