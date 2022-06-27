import { describe, expect, test } from "vitest"
import { createSvelidateFormStore } from "$tests/utilities"

describe("svelte store", () => {
	const initialValue = ""
	const { svelidateForm, svelidateStore } = createSvelidateFormStore({
		string: { value: initialValue },
		object: { value: {} as Record<string, unknown> },
	})

	test("can subscribe", () => {
		expect(svelidateForm.string.value).toBe(initialValue)
	})

	test("can update (primitive)", () => {
		let local = {} as typeof svelidateForm
		svelidateStore.subscribe(val => {
			local = val
		})

		const newString = "test"

		svelidateForm.string.value = newString
		svelidateStore.set(svelidateForm)

		expect(local.string.value).toBe(newString)
	})

	test("can update (reference)", () => {
		let local = {} as typeof svelidateForm
		svelidateStore.subscribe(val => {
			local = val
		})

		const newNestedString = "test"

		svelidateForm.object.value.test = newNestedString
		svelidateStore.set(svelidateForm)

		expect(local.object.value.test).toBe(newNestedString)
	})
})
