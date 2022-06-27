import type { SvelidateForm, SvelidateFormStore, UninitializedForm } from "$src"

export type ExtractSvelidateForm<
	S extends SvelidateFormStore<UninitializedForm, any>
> = S extends SvelidateFormStore<infer F>
	? SvelidateForm<F>
	: Record<string, never>
