import type { SvelidateInputType } from "../../html"
import type { HtmlValidator, ValidatorWrapper } from "../validators"
import type { UninitializedFieldAttributes, UninitializedForm } from "./input"

type SvelidateFieldAttributes = {
	name: string
} & UninitializedFieldAttributes &
	HtmlValidator

export type SvelidateField<T = unknown> = {
	value: T
	validators?: ValidatorWrapper<T>[]
	type?: SvelidateInputType | null
	touched?: boolean
	attributes?: SvelidateFieldAttributes
	errors?: string[]
	invalid?: boolean
}

export type $State = {
	$st: {
		invalid: boolean
		submitted: boolean
		initial: Readonly<UninitializedForm>
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

export type $Meta = $State & $Events & $Functions

export type NakedSvelidateForm<F extends UninitializedForm> = {
	[K in keyof F]: Required<SvelidateField<F[K]["value"]>>
} & Partial<$Meta>

export type SvelidateForm<F extends UninitializedForm> = {
	[K in keyof F]: Required<SvelidateField<F[K]["value"]>>
} & $Meta
