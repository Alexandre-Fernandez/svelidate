import type { UninitializedForm } from "../svelidate/core/input"
import type { SvelidateForm } from "../svelidate/core/output"

export type SvelteStore<T> = {
	subscribe: (run: (value: T) => any, invalidate?: any) => any
}

export type SvelidateFormStore<
	F extends UninitializedForm,
	T = SvelidateForm<F>
> = SvelteStore<T> & {
	set: (value: T) => void
}

export type Subscriber = <F extends UninitializedForm>(
	form: SvelidateForm<F>
) => void
