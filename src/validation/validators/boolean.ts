import { getMatchingHtmlValidator } from "../../utilities/input"
import { createBooleanValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

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
