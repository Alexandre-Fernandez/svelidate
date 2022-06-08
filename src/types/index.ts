import { Validator } from "@svelidate/validation"

export type FormField<T = unknown> = {
	value: T
	validators?: Validator<T>[]
	errors?: string[]
	touched?: boolean
	invalid?: boolean
	ref?: HTMLInputElement | null
}

export type Form = {
	[key: PropertyKey]: FormField
}

export type Naked$Form<F extends Form> = {
	[K in keyof F]: Required<FormField<F[K]["value"]>>
} & Partial<$Meta>
export type $Form<F extends Form> = {
	[K in keyof F]: Required<FormField<F[K]["value"]>>
} & $Meta

export type $Meta = $State & $Events & $Functions
export type $State = {
	$st: {
		invalid: boolean
		submitted: boolean
		initial: Readonly<Form>
		form: HTMLFormElement | null
	}
}
export type $Events = {
	$on: {
		submit: (e?: SubmitEvent) => void
		touch: (key: string) => void
	}
}
export type $Functions = {
	$fn: {
		submit: (e?: SubmitEvent) => void
		reset: () => void
		untouch: () => void
		getErrors: () => string[]
	}
}

type SvelteStore<T> = {
	subscribe: (run: (value: T) => any, invalidate?: any) => any
}
export type Svelidate$Form<F extends Form, T = $Form<F>> = SvelteStore<T> & {
	set: (value: T) => void
}

export type Subscriber = <F extends Form>(form: $Form<F>) => void
