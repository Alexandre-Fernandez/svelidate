import type { JsValidatorPredicate, ValidatorCollection } from "../../types"

export function createConditionalValidatorCollection(
	condition: JsValidatorPredicate,
	validator: ValidatorCollection
): ValidatorCollection {
	return {
		js: (value: unknown) => {
			if (condition(value)) return validator.js(value)
			return undefined
		},
		html: validator.html,
	}
}

export function validateIf<
	T extends ValidatorCollection | ValidatorCollection[]
>(condition: JsValidatorPredicate, validators: T) {
	if (Array.isArray(validators)) {
		return validators.map(validator =>
			createConditionalValidatorCollection(condition, validator)
		) as T
	}
	return createConditionalValidatorCollection(
		condition,
		validators as ValidatorCollection
	) as T
}
