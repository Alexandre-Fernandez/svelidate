import { describe, expect, test } from "vitest"
import { svelidate } from "$src"
import type { ExtractSvelidateForm } from "$tests/types"

describe("svelte store", () => {
	const initialValue = ""
	const svelidateStore = svelidate({
		string: { value: initialValue },
		object: { value: {} as Record<string, unknown> },
	})

	let mainSubscriber = {} as ExtractSvelidateForm<typeof svelidateStore>
	svelidateStore.subscribe(val => {
		mainSubscriber = val
	})

	test("can subscribe", () => {
		let localSubscriber = {} as typeof mainSubscriber
		svelidateStore.subscribe(val => {
			localSubscriber = val
		})
		expect(localSubscriber.string.value).toBe(initialValue)
		expect(mainSubscriber.string.value).toBe(initialValue)
	})

	test("can update (primitive)", () => {
		let localSubscriber = {} as typeof mainSubscriber
		svelidateStore.subscribe(val => {
			localSubscriber = val
		})

		const primitive = "primitive"

		svelidateStore.set({
			$st: mainSubscriber.$st,
			$fn: mainSubscriber.$fn,
			$on: mainSubscriber.$on,
			string: {
				...mainSubscriber.string,
				value: primitive,
			},
			object: mainSubscriber.object,
		} as typeof mainSubscriber)

		expect(localSubscriber.string.value).toBe(primitive)
		expect(mainSubscriber.string.value).toBe(primitive)
	})

	test("can update (reference)", () => {
		let localSubscriber = {} as typeof mainSubscriber
		svelidateStore.subscribe(val => {
			localSubscriber = val
		})

		const reference = "reference"

		mainSubscriber.object.value.test = reference
		svelidateStore.set(mainSubscriber)

		expect(localSubscriber.object.value.test).toBe(reference)
		expect(mainSubscriber.object.value.test).toBe(reference)
	})

	test("can unsubscribe", () => {
		let localSubscriber = {} as typeof mainSubscriber
		const unsubscribe = svelidateStore.subscribe(val => {
			localSubscriber = val
		})

		const subscribed = "subscribed"

		svelidateStore.set({
			$st: mainSubscriber.$st,
			$fn: mainSubscriber.$fn,
			$on: mainSubscriber.$on,
			string: {
				...mainSubscriber.string,
				value: subscribed,
			},
			object: mainSubscriber.object,
		} as typeof mainSubscriber)

		expect(localSubscriber.string.value).toBe(subscribed)
		expect(mainSubscriber.string.value).toBe(subscribed)

		unsubscribe()
		const unsubscribed = "unsubscribed"

		svelidateStore.set({
			$st: mainSubscriber.$st,
			$fn: mainSubscriber.$fn,
			$on: mainSubscriber.$on,
			string: {
				...mainSubscriber.string,
				value: unsubscribed,
			},
			object: mainSubscriber.object,
		} as typeof mainSubscriber)

		expect(localSubscriber.string.value).not.toBe(unsubscribed)
		expect(mainSubscriber.string.value).toBe(unsubscribed)
	})
})
