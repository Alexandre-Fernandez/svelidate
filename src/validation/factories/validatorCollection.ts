import type { JsValidatorPredicate, ValidatorWrapper } from "../../types"

export function createConditionalValidatorWrapper(
	condition: JsValidatorPredicate,
	validator: ValidatorWrapper
): ValidatorWrapper {
	return {
		js: (value: unknown) => {
			if (condition(value)) return validator.js(value)
			return undefined
		},
		html: validator.html,
	}
}

export function validateIf<T extends ValidatorWrapper | ValidatorWrapper[]>(
	condition: JsValidatorPredicate,
	validators: T
) {
	if (Array.isArray(validators)) {
		return validators.map(validator =>
			createConditionalValidatorWrapper(condition, validator)
		) as T
	}
	return createConditionalValidatorWrapper(
		condition,
		validators as ValidatorWrapper
	) as T
}
