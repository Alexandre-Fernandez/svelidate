# Svelidate

> Simple and lightweight form validation for Svelte with no dependencies

## Installation

```ts
// npm
npm install svelidate
// yarn
yarn add svelidate
// pnpm
pnpm add svelidate
```

## Usage

```ts
<script  lang="ts">
	import { svelidate } from "svelidate"
	import { isEmail, isRequired } from "svelidate"

	let form = svelidate({
		email: {
		value:  "default value",
		validators: [
			isRequired("Your custom error message."),
			isEmail("Please enter a valid e-mail.")
		],
		},
		// other fields...
	})

	$form.$on.submit = (e) => {
		// handleSubmit
	}
</script>

<form on:submit={$form.$fn.submit}>
	<ul>
		{#each $form.email.errors as error}
		<li>{error}</li>
		{/each}
	</ul>
	<input type="text" bind:value={$form.email.value}/>
</form>
```

## Fields

Only `value` is mandatory when declaring your form field. Here are all the available props per form field once `svelidate()` has been used :

```ts,
const field = {
	value: T // the value to bind to the input
	validators: FormFieldValidator<T>[] // you can either import them or make your own
	errors: string[] // an array of errors messages returned by the failed validators
	touched: boolean // true if `value` got modified (submitting the form resets it to false)
	invalid: boolean // true if `errors.length` > 0
}
```

## Form

Svelidate adds 3 top level properties to the initial form, `$st` for global form state, `$fn` for form functions and `$on` to subscribe to a form event.

### `$st`

```ts
const $st = {
	invalid: boolean // true if any form field is invalid
	submitted: boolean // true once `$fn.submit` has been called
	initial: Readonly<Form> // the original form passed to `svelidate()`
}
```

### `$fn`

```ts
const $fn = {
	submit: (e?: SubmitEvent) =>  void // handles submit and then calls `$on.submit`
	reset: () =>  void // resets all the form fields to their initial values
	untouch: () =>  void // resets all the form fields `touched` values to false
}
```

### `$on`

```ts
const $on = {
	submit: (e?: SubmitEvent) =>  void // called after submitting with `$fn.submit`
}
```

## Validators

### Default validators

Svelidate comes with multiple validators that you can use :

-   `isRequired`: Invalid when value is falsy and not equal to 0.
-   `isEmail`: Invalid when value is not a string and an e-mail.
-   `isRegexMatched`: Invalid when value is not a string and doesn't match the regex.
-   `isEqualTo`: Invalid when values are not strictly equal.
-   `isGreaterThan`: Invalid if value is lesser or equal. [^1]
-   `isGreaterThanOrEqualTo`: Invalid if value is lesser. [^1]
-   `isLesserThan`: Invalid if value is greater or equal. [^1]
-   `isLesserThanOrEqualTo`: Invalid if value is greater. [^1]
-   `isInRange`: Invalid if value is outside the given range. [^1]
-   `isOutOfRange`: Invalid if value is inside the given range. [^1]

[^1]: Works with `number`, `string` (based on `.length`) and `array` (based on `.length`)

### Custom validators

You can also create your own validator, a validator takes an unknown `value` as an argument and needs to return `undefined` if it's valid or an error message `string` if there's an error.
Svelidate provides a helper function to create validator called `createValidator`, here's how to use it :

```ts
const isRequired = createValidator(value => {
	if (!value && value !== 0) return false
	return true
}, "default message")
const requiredValidator = isRequired() // will return "default message" on not valid

const isRegexMatched = (regex: RegExp) =>
	createValidator(value => {
		if (typeof value !== "string") return false
		return regex.test(value)
	})
const regexMatchedValidator = isRegexMatched(/[a-z]/)("custom message") // will return "custom message" on not valid
```
