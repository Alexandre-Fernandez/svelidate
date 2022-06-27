import { describe, expect, test } from "vitest"
import { createSvelidateFormStore } from "./helpers"

describe("svelte store", () => {
	const { svelidateForm, svelidateStore } = createSvelidateFormStore({
		email: { value: "" },
	})

	test("can subscribe & update", () => {
		let local = {} as typeof svelidateForm
		svelidateStore.subscribe(val => {
			local = val
		})

		const newEmail = "a@a.a"

		svelidateForm.email.value = newEmail
		svelidateStore.set(svelidateForm)

		expect(local.email.value).toBe(newEmail)
	})
})
