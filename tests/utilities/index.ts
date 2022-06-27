/* eslint-disable import/prefer-default-export */
import { svelidate, SvelidateConfiguration, UninitializedForm } from "$src"
import type { ExtractSvelidateForm } from "$tests/types"
import type { PartialAll } from "$src/types/utilities"

export function createSvelidateFormStore<F extends UninitializedForm>(
	initialForm: F,
	config?: PartialAll<SvelidateConfiguration>
) {
	const svelidateStore = svelidate(initialForm, config)

	let svelidateForm = {} as ExtractSvelidateForm<typeof svelidateStore>

	svelidateStore.subscribe(val => {
		svelidateForm = val
	})

	return { svelidateStore, svelidateForm }
}
