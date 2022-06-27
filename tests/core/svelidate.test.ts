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

		const newString = "primitive"

		// FIXME because of subscribe local is already equal to svelidateForm
		// make a clone to set
		svelidateForm.string.value = newString
		svelidateStore.set(svelidateForm)

		expect(local.string.value).toBe(newString)
	})

	test("can update (reference)", () => {
		let local = {} as typeof svelidateForm
		svelidateStore.subscribe(val => {
			local = val
		})

		const newNestedString = "reference"

		svelidateForm.object.value.test = newNestedString
		svelidateStore.set(svelidateForm)

		expect(local.object.value.test).toBe(newNestedString)
	})

	// test("can unsubscribe", () => {
	// 	let local = {} as typeof svelidateForm
	// 	const unsubscribe = svelidateStore.subscribe(val => {
	// 		local = val
	// 	})

	// 	let newString = "subscribed"

	// 	svelidateForm.string.value = newString
	// 	console.log(local)
	// 	return
	// 	svelidateStore.set(svelidateForm)

	// 	expect(local.string.value).toBe(newString)

	// 	unsubscribe()

	// 	newString = "unsubscribed"

	// 	svelidateForm.string.value = newString
	// 	svelidateStore.set(svelidateForm)

	// 	expect(local.string.value).toBe(newString)
	// })
})
