export { svelidate } from "./form"
export { svelidateConfig } from "./form/config"
export type {
	UninitializedForm,
	SvelidateForm,
	SvelidateFormStore,
	SvelidateConfiguration,
	ValidatorWrapper,
	JsValidator,
	JsValidatorPredicate,
	HtmlValidator,
	HtmlValidatorMapper,
} from "./types"
export { getMatchingHtmlValidator } from "./utilities/input"
export { validateIf } from "./validation/factories/validatorCollection"
export {
	createValidatorWrapperFactory,
	createStringValidatorWrapperFactory,
	createNumberValidatorWrapperFactory,
	createDateValidatorWrapperFactory,
} from "./validation/factories/validatorCollectionFactory"
export * from "./validation/validators"

// TODO: add validators for file
/*
Unique file type specifiers
A unique file type specifier is a string that describes a type of file that may 
be selected by the user in an <input> element of type file. Each unique file type 
specifier may take one of the following forms:

A valid case-insensitive filename extension, starting with a period (".") character. 
For example: .jpg, .pdf, or .doc.
A valid MIME type string, with no extensions.
The string audio/* meaning "any audio file".
The string video/* meaning "any video file".
The string image/* meaning "any image file".
The accept attribute takes a string containing one or more of these unique file 
type specifiers as its value, separated by commas. For example, a file picker that 
needs content that can be presented as an image, including both standard image formats 
and PDF files, might look like this:

<input type="file" accept="image/*,.pdf">

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file

capture & accept
*/
