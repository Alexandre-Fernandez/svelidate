export type UninitializedForm = {
	[key: PropertyKey]: Field
}

export type Field<T = unknown> = {
	value: T
	validators?: ValidatorCollection<T>[]
	errors?: string[]
	touched?: boolean
	invalid?: boolean
	attributes?: FormFieldAttributes
}
type FormFieldAttributes = {
	name?: string
	title?: string
} & HtmlValidator

export type NakedSvelidateForm<F extends UninitializedForm> = {
	[K in keyof F]: Required<Field<F[K]["value"]>>
} & Partial<$Meta>
export type SvelidateForm<F extends UninitializedForm> = {
	[K in keyof F]: Required<Field<F[K]["value"]>>
} & $Meta

export type $Meta = $State & $Events & $Functions
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

type SvelteStore<T> = {
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

export type ValidatorCollection<
	T = unknown,
	I extends SvelidateInputType = SvelidateInputType
> = Readonly<{
	js: JsValidator<T>
	html: HtmlValidatorMapper<I>
}>

export type JsValidator<T = unknown> = (value: T) => string | undefined
export type JsValidatorPredicate<T = unknown> = (value: T) => boolean

export type HtmlValidatorMapper<
	T extends SvelidateInputType = SvelidateInputType
> = (inputType?: T) => HtmlValidator
export type HtmlValidator = {
	required?: boolean
	pattern?: string
	minLength?: number
	maxLength?: number
	min?: number | string
	max?: number | string
}

export type HtmlPseudoInputType = "select" | "textarea"
export type HtmlNumberInput = "number" | "range"
export type HtmlDateTimeInputType =
	| "datetime-local" // YYYY-MM-DDThh:mm
	| "date" // YYYY-MM-DD
	| "month" // YYYY-MM
	| "week" // YYYY-Www
	| "time" // hh:mm
export type HtmlStringInput =
	| "text"
	| "tel"
	| "email"
	| "url"
	| "password"
	| "search"
export type HtmlInputType =
	| HtmlDateTimeInputType
	| HtmlNumberInput
	| HtmlStringInput
	| "checkbox"
	| "color"
	| "file"
	| "hidden"
	| "radio"
	| "reset"
	| "submit"
export type SvelidateInputType = HtmlInputType | HtmlPseudoInputType | "custom"
