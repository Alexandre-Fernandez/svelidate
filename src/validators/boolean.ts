import { createBooleanValidatorWrapperFactory } from "./factories"
import { getMatchingHtmlValidator } from "./helpers"

const boolean = {
	true: createBooleanValidatorWrapperFactory(
		value => value,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				checkbox: () => ({
					required: true,
				}),
			})
	),
	false: createBooleanValidatorWrapperFactory(
		value => !value,
		() => ({})
	),
}

export default boolean
