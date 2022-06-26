export type HtmlPseudoInputType = "select-multiple" | "select-one" | "textarea"

export type HtmlFileInputType = "file"

export type HtmlCheckboxInputType = "checkbox"

export type HtmlNumberInputType = "number" | "range"

export type HtmlColorInputType = "color"

export type HtmlRadioInputType = "radio"

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
	| HtmlCheckboxInputType
	| HtmlColorInputType
	| HtmlRadioInputType
	| "hidden"
	| "reset"
	| "submit"

export type HtmlInputmodeAttribute =
	| "none"
	| "text"
	| "decimal"
	| "numeric"
	| "tel"
	| "search"
	| "email"
	| "url"

export type HtmlAutocompleteAttribute =
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

export type SvelidateInputType = HtmlInputType | HtmlPseudoInputType
