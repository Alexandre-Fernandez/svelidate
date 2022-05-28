import { createValidator } from "./utils"

export const general = {
	truthy: createValidator(value => !!value),
	falsy: createValidator(value => !value),
	required: createValidator(value => {
		if (!value && value !== 0) return false
		return true
	}),
	equalTo(value: any) {
		return createValidator(val => val === value)
	},
	differentFrom(value: any) {
		return createValidator(val => val !== value)
	},
}
