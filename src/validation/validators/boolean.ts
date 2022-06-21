import { createBooleanValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

const boolean = {
	true: createBooleanValidatorWrapperFactory(
		value => !!value,
		() => ({ required: true })
	),
	false: createBooleanValidatorWrapperFactory(
		value => !value,
		() => ({})
	),
}

export default boolean
