export type PartialAll<T> = {
	[K in keyof T]?: T[K] extends object ? PartialAll<T[K]> : T[K]
}

export type SvelidateConfiguration = {
	mode: "html-only" | "js-only" | "default" | "all"
	pattern: {
		symbol: string
		email: string
	}
}

// TODO: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
type UninitializedFieldAttributes = {
	title?: string
	placeholder?: string
	readonly?: boolean
	step?: number | string
	multiple?: boolean
	size?: number
	orient?: HtmlOrientAttribute
	autocomplete?: HtmlAutocompleteAttribute
	spellcheck?: boolean | ""
}

export type UninitializedField<T = unknown> = {
	value: T
	validators?: ValidatorWrapper<T>[]
	type?: HtmlInputType
	touched?: boolean
	attributes?: UninitializedFieldAttributes
}
export type UninitializedForm = {
	[key: PropertyKey]: UninitializedField
}

type SvelidateFieldAttributes = {
	name: string
} & UninitializedFieldAttributes &
	HtmlValidator
export type SvelidateField<T = unknown> = {
	value: T
	validators?: ValidatorWrapper<T>[]
	type?: HtmlInputType | null
	touched?: boolean
	attributes?: SvelidateFieldAttributes
	errors?: string[]
	invalid?: boolean
}

export type NakedSvelidateForm<F extends UninitializedForm> = {
	[K in keyof F]: Required<SvelidateField<F[K]["value"]>>
} & Partial<$Meta>
export type SvelidateForm<F extends UninitializedForm> = {
	[K in keyof F]: Required<SvelidateField<F[K]["value"]>>
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

export type ValidatorWrapper<
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

export type HtmlPseudoInputType = "select-multiple" | "select-one" | "textarea"
export type HtmlFileInputType = "file"
export type HtmlNumberInputType = "number" | "range"
export type HtmlDateTimeInputType =
	| "datetime-local" // YYYY-MM-DDThh:mm
	| "date" // YYYY-MM-DD
	| "month" // YYYY-MM
	| "week" // YYYY-Www
	| "time" // hh:mm
export type HtmlStringInputType =
	| "text"
	| "tel"
	| "email"
	| "url"
	| "password"
	| "search"
export type HtmlInputType =
	| HtmlDateTimeInputType
	| HtmlNumberInputType
	| HtmlStringInputType
	| HtmlFileInputType
	| "checkbox"
	| "color"
	| "hidden"
	| "radio"
	| "reset"
	| "submit"
export type SvelidateInputType = HtmlInputType | HtmlPseudoInputType

type HtmlOrientAttribute = "horizontal" | "vertical"
type HtmlAutocompleteAttribute =
	| "off"
	| "on"
	| "name"
	| "honorific-prefix"
	| "given-name"
	| "additional-name"
	| "family-name"
	| "honorific-suffix"
	| "nickname"
	| "email"
	| "username"
	| "new-password"
	| "current-password"
	| "one-time-code"
	| "organization-title"
	| "organization"
	| "street-address"
	| "address-line1"
	| "address-line2"
	| "address-line3"
	| "address-level4"
	| "address-level3"
	| "address-level2"
	| "address-level1"
	| "country"
	| "country-name"
	| "postal-code"
	| "cc-name"
	| "cc-given-name"
	| "cc-additional-name"
	| "cc-family-name"
	| "cc-number"
	| "cc-exp"
	| "cc-exp-month"
	| "cc-exp-year"
	| "cc-csc"
	| "cc-type"
	| "transaction-currency"
	| "transaction-amount"
	| "language"
	| "bday"
	| "bday-day"
	| "bday-month"
	| "bday-year"
	| "sex"
	| "tel"
	| "tel-country-code"
	| "tel-national"
	| "tel-area-code"
	| "tel-local"
	| "tel-extension"
	| "impp"
	| "url"
	| "photo"

export type ByteUnit = "b" | "kb" | "mb" | "gb" | "tb"

export type VectorExtension = "svg" | "svgz"
export type RasterExtension =
	| ".tiff"
	| ".pjp"
	| ".jfif"
	| ".bmp"
	| ".gif"
	| ".png"
	| ".xbm"
	| ".dib"
	| ".jxl"
	| ".jpeg"
	| ".jpg"
	| ".webp"
	| ".ico"
	| ".tif"
	| ".pjpeg"
	| ".avif"
export type VideoExtension =
	| ".ogm"
	| ".wmv"
	| ".mpg"
	| ".webm"
	| ".ogv"
	| ".mov"
	| ".asx"
	| ".mpeg"
	| ".mp4"
	| ".m4v"
	| ".avi"
export type AudioExtension =
	| ".opus"
	| ".flac"
	| ".webm"
	| ".weba"
	| ".wav"
	| ".ogg"
	| ".m4a"
	| ".oga"
	| ".mid"
	| ".mp3"
	| ".aiff"
	| ".wma"
	| ".au"
export type OfficeExtension =
	| ".docx"
	| ".docm"
	| ".dotx"
	| ".dotm"
	| ".docb"
	| ".pdf"
	| ".wll"
	| ".wwl"
	| ".xlsx"
	| ".xlsm"
	| ".xltx"
	| ".xltm"
	| ".xlsb"
	| ".xla"
	| ".xlam"
	| ".xll"
	| ".xlw"
	| ".pptx"
	| ".pptm"
	| ".potx"
	| ".potm"
	| ".ppam"
	| ".ppsx"
	| ".ppsm"
	| ".sldx"
	| ".sldm"
	| ".pa"
	| ".adn"
	| ".accdb"
	| ".accdr"
	| ".accdt"
	| ".accda"
	| ".mdw"
	| ".accdt"
	| ".accde"
	| ".mam"
	| ".maq"
	| ".mar"
	| ".mat"
	| ".maf"
	| ".laccdb"
	| ".one"
	| ".ecf"
	| ".xps"
export type CompressedExtension =
	| ".7z"
	| ".arj"
	| ".deb"
	| ".pkg"
	| ".rar"
	| ".rpm"
	| ".tar.gz"
	| ".z"
	| ".zip"
export type MediaExtension = ".bin" | ".dmg" | ".iso" | ".toast" | ".vcd"
export type DataExtension =
	| ".csv"
	| ".dat"
	| ".db"
	| ".dbf"
	| ".log"
	| ".mdb"
	| ".sav"
	| ".sql"
	| ".tar"
	| ".xml"
	| ".json"
export type EmailExtension =
	| ".email"
	| ".eml"
	| ".emlx"
	| ".msg"
	| ".oft"
	| ".ost"
	| ".pst"
	| ".vcf"
export type ExecutableExtension =
	| ".apk"
	| ".bat"
	| ".bin"
	| ".cgi"
	| ".pl"
	| ".com"
	| ".exe"
	| ".gadget"
	| ".jar"
	| ".msi"
	| ".py"
	| ".wsf"
export type WebExtension =
	| ".asp"
	| ".aspx"
	| ".cer"
	| ".cfm"
	| ".cgi"
	| ".pl"
	| ".css"
	| ".htm"
	| ".html"
	| ".js"
	| ".jsp"
	| ".part"
	| ".php"
	| ".py"
	| ".rss"
	| ".xhtml"
export type FontExtension = ".fnt" | ".fon" | ".otf" | ".ttf"
export type ImageExtension = VectorExtension | RasterExtension
type StringUnion<T extends string> = T | Omit<string, T>
export type FileExtension = StringUnion<
	| ImageExtension
	| VideoExtension
	| AudioExtension
	| OfficeExtension
	| CompressedExtension
	| MediaExtension
	| DataExtension
	| EmailExtension
	| ExecutableExtension
	| FontExtension
	| WebExtension
>
