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

-   Star the [github repo](https://github.com/svelidate/svelidate) 😎

```tsx
<script lang="ts">
	import { svelidate, string as s, general as g } from "svelidate"

	const form = svelidate({
		email: {
			value: "",
			validators: [
				g.required("This field is required."),
				s.email("Please enter a valid email."),
			],
		},
		password: {
			value: "",
			validators: [
				g.required("This field is required."),
				s.lowerCase("Password needs to have atleast one lower case letter."),
				s.upperCase("Password needs to have atleast one upper case letter."),
				s.number("Password needs to have atleast one number."),
				s.symbol()("Password needs to have one symbol."),
				s.length.gt(6)("Password needs to have more than 6 characters."),
			],
		},
	})

	$form.$on.submit = () => {
		// handle submit...
	}
</script>

<form on:submit={$form.$fn.submit}>
	<div>
		<!-- displaying email errors -->
		<ul>
			{#each $form.email.errors as error}
				<li>{error}</li>
			{/each}
		</ul>

		<input type="text" bind:value={$form.email.value} />
	</div>

	<div>
		<!-- displaying password errors -->
		<ul>
			{#each $form.password.errors as error}
				<li>{error}</li>
			{/each}
		</ul>

		<input type="password" bind:value={$form.password.value} />
	</div>
	<button disabled={$form.$st.invalid}>Submit</button>
</form>
```

## Form

To create a svelidate form just use `svelidate(yourFormObject)` with an object representing your form, see the [form fields](#form-fields) section for more information.
Svelidate adds 3 top level properties to the initial form, `$st` for global form state, `$fn` for form functions and `$on` to subscribe to a form event.

<details>
	<summary><h3><code>$st</code></h3></summary>
<pre lang="ts">
const $st = {
	invalid: boolean // true if any form field is invalid
	submitted: boolean // true once `$fn.submit` has been called
	initial: Readonly≺Form≻ // the original form passed to `svelidate()` 
}
</pre>
</details>

<details>
	<summary><h3><code>$fn</code></h3></summary>
<pre lang="ts">
const $fn = {
	submit: (e?: SubmitEvent) =>  void // handles submit and then calls `$on.submit`
	reset: () =>  void // resets all the form fields to their initial values
	untouch: () =>  void // resets all the form fields `touched` values to false
	getErrors: () => string[] // returns all the current errors
}
</pre>
</details>

<details>
	<summary><h3><code>$on</code></h3></summary>
<pre lang="ts">
const $on = {
	submit: (e?: SubmitEvent) =>  void // called after submitting with `$fn.submit`
	touch: (key: string) => void // called when an input is touched
}
</pre>
</details>

## Form fields

The argument passed to `svelidate()` is an object having form field names as keys and form fields objects as values.
Here are all the available properties a form field object can have (after using `svelidate()` all of them will exist, undefined ones will be created by the function).

```ts,
const field = {
	value: T // the value to bind to the input
	validators: FormFieldValidator<T>[] // you can either import them or make your own
	errors: string[] // an array of errors messages returned by the failed validators
	touched: boolean // true if `value` got modified (submitting the form resets it to false)
	invalid: boolean // true if `errors.length` > 0
}
```

Only `value` is mandatory when creating a form field.
If your form field object is invalid (for example having `invalid === false` and `errors.length > 0`) it will be corrected by `svelidate()`.

## Validators

### Default validators

Svelidate comes with multiple validators that you can use, they are grouped by category (object): `general` when they can be used for many value types (e.g. `required` or `truthy`), `string` to validate strings, `number` for numbers and `date` for dates.

<details>
	<summary><h4><code>general</code></h4></summary>
<pre lang="ts">
const general = {
	truthy, // value is truthy (can be used to validate booleans/checkboxes).
	falsy, // value is falsy (can be used to validate booleans/checkboxes).
	required, // value is truthy or strictly equal to 0.
	eq(value: any), // value is strictly equal to argument.
	neq(value: any), // value is strictly different from argument.
}
</pre>
</details>

<details>
	<summary><h4><code>string</code></h4></summary>
<pre lang="ts">
// value must be a string
const string = {
	email, // value is an e-mail.
	upperCase, // value has atleast one upper case letter.
	lowerCase, // value has atleast one lower case letter.
	number, // value has atleast one number.
	symbol(symbols: string[]), // value has atleast one symbol ( !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~), a custom symbol array can be given.
	regex(regex: RegExp), // value matches the given regex.
	eq(string: string), // value is equal to the given string.
	neq(string: string), // value is different from the given string.,
	length: {
		gt(length: number), // value length is longer than the given length.
		gte(length: number), // value length is longer than or equal to the given length.
		lt(length: number), // value length is shorter than the given length.
		lte(length: number), // value length is shorter than or equal to the given length.
		inside(min: number, max: number), // value length is included in the given range.
		outside(min: number, max: number), // value length is excluded from the given range.
		neq(length: number), // value length is different from the given one.
		eq(length: number), // value length is equal to the given one.
	},
}
</pre>
</details>

<details>
	<summary><h4><code>number</code></h4></summary>
<pre lang="ts">
// value must be a number
const number = {
	gt(number: number), // value is greater than the given number.
	gte(number: number), // value is greater than or equal to the given number.
	lt(number: number), // value is lesser than the given number.
	lte(number: number), // value is lesser than or equal to the given number.
	inside(min: number, max: number), // value is in included in the given interval.
	outside(min: number, max: number), // value is in excluded from the given interval.
	neq(number: number), // value is different from the given number.
	eq(number: number), // value is equal to the given number.
}
</pre>
</details>

<details>
	<summary><h4><code>date</code></h4></summary>
<pre lang="ts">
// value must be a string or a date, if it's a string it will be parsed using the `Date` constructor.
const date = {
	gt(date: Date), // value is after the given date.
	gte(date: Date), // value is after the or is the given date.
	lt(date: Date),  // value is before the given date.
	lte(date: Date), // value is before the or is the given date.
	inside(min: Date, max: Date), // value is between the given date range.
	outside(min: Date, max: Date), // value is outside the given date range.
	neq(date: Date), // value is not the given date.
	eq(date: Date), // value is the given date.
}
</pre>
</details>

### Custom validators

You can also create your own validator, a validator takes the binded input `value` has an argument and returns `undefined` if there are no errors or a `string` containing the error message.
Because the error message may change (for example if using translation keys), svelidate provide helper functions to create a validator factory that can take custom error messages.
These helper functions take, a `callback` that must return `true` if the value is valid or `false` if it's not, and a `string` for the default error message (optional).

```ts
import {
	createValidator,
	createStringValidator, // will return an error if value is not a string.
	createNumberValidator, // will return an error if value is not a number.
	createDateValidator, // will return an error if value is not a date (it will try to parse it as a date first using the `Date` constructor).
} from "svelidate"

//
const isObject = createValidator(
	value => typeof value === "object",
	"This is not an object !"
)

const objectValidator = isObject() // this is what you use in form fields (`isObject()`)
objectValidator({}) // return undefined
objectValidator("string") // returns "This is not an object !"

//
// you can also pass params by wrapping it in another function:
const isNumberEqualTo = (number: number) => {
	return createNumberValidator(value => value === number)
}

const threeValidator = isNumberEqualTo(3)("This is not equal to 3 !")
threeValidator(3) // return undefined
threeValidator(69) // return "This is not equal to 3 !"
```

### Conditional validation

You can make any validator or array of validator only validate if a condition is true/undefined by using the `validateIf(predicate: Validator | ValidatorPredicate, validators: Validator | Validator[] )` function.

```ts
import { validateIf, general } from "svelidate"

const value = undefined

// if the predicate returns true or undefined the general.required() will be run as normal
validateIf(() => true, general.required("error"))(value) // returns "error"

// else it won't return any errors, even if the value is not valid
validateIf(() => false, general.required("error"))(value) // returns undefined

// validateIf can also be used to validate arrays
validateIf(
	() => false,
	[general.required("error1"), general.truthy("error2")]
).map(validator => validator(value)) // returns [undefined, undefined]
```

If you want to make a custom validator conditional you can use `createConditionalValidator(predicate: Validator | ValidatorPredicate, validator: Validator)`. Same usage, except it doesn't take arrays.
