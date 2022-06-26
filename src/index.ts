// ANCHOR base

export { svelidateConfig } from "./config"
export { default as svelidate } from "./core/svelidate"

// ANCHOR validators

export { default as number } from "./validators/number"
export { default as string } from "./validators/string"
export { default as boolean } from "./validators/boolean"
export { default as date } from "./validators/date"
export { default as filelist } from "./validators/filelist"

// ANCHOR helpers

export {
	createBooleanValidatorWrapperFactory,
	createDateValidatorWrapperFactory,
	createFileListValidatorWrapperFactory,
	createNumberValidatorWrapperFactory,
	createStringValidatorWrapperFactory,
	createValidatorWrapperFactory,
	validateIf,
} from "./validators/factories"
export { getMatchingHtmlValidator } from "./validators/helpers"

// ANCHOR types

export type { SvelidateConfiguration } from "./types/svelidate/config"
export type { UninitializedForm } from "./types/svelidate/core/input"
export type { SvelidateForm } from "./types/svelidate/core/output"
export type {
	HtmlValidator,
	HtmlValidatorMapper,
	JsValidator,
	JsValidatorPredicate,
	ValidatorWrapper,
} from "./types/svelidate/validators"
export type { SvelidateFormStore } from "./types/svelte"
