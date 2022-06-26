import { forEachFormField } from "../helpers"
import isBrowser from "../../../environment"
import type { SvelidateConfiguration } from "../../../types/svelidate/config"
import type { UninitializedForm } from "../../../types/svelidate/core/input"
import type {
	SvelidateField,
	SvelidateForm,
} from "../../../types/svelidate/core/output"
import type { HtmlValidator } from "../../../types/svelidate/validators"
import { isLookahead, mergeObjects } from "../../../utilities"

export function updateFormState<F extends UninitializedForm>(
	newForm: SvelidateForm<F>
) {
	let isInvalid = false
	forEachFormField(newForm, formField => {
		if (formField.invalid) isInvalid = true
	})
	newForm.$st.invalid = isInvalid
}

export function updateFormField(
	formField: Required<SvelidateField>,
	config: SvelidateConfiguration
) {
	let mode: Exclude<SvelidateConfiguration["mode"], "available"> = "all"
	if (config.mode === "default") {
		if (isBrowser) mode = "js-only"
		else mode = "html-only"
	} else mode = config.mode

	let pattern = ""
	const errors: string[] = []
	const htmlValidator: HtmlValidator = {}
	formField.validators.forEach(validator => {
		if (isBrowser && (mode === "all" || mode === "js-only")) {
			const error = validator.js(formField.value)
			if (error !== undefined) errors.push(error)
		}
		// validate html
		if (mode === "all" || mode === "html-only") {
			if (!formField.type) return
			const { pattern: lookahead, ...localValidator } = validator.html(
				formField.type
			)
			if (lookahead && isLookahead(lookahead)) pattern += lookahead
			mergeObjects(htmlValidator, localValidator)
		}
	})
	if (pattern) htmlValidator.pattern = `^${pattern}.+$`

	// adding errors :
	formField.errors = errors
	if (formField.errors.length > 0) formField.invalid = true
	else formField.invalid = false

	// adding attributes :
	mergeObjects(formField.attributes, htmlValidator)
}
