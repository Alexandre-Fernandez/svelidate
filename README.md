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

```tsx
<script lang="ts">
	import { svelidate, string as s, general as g } from "svelidate"

	const form = svelidate({
		email: {
			value: "",
			validators: [
				g.required("This field is required."),
				s.isEmail("Please enter a valid email."),
			],
		},
		password: {
			value: "",
			validators: [
				g.required("This field is required."),
				s.hasLowerCaseLetter("Password needs to have atleast one lower case letter."),
				s.hasUpperCaseLetter("Password needs to have atleast one upper case letter."),
				s.hasNumber("Password needs to have atleast one number."),
				s.hasSymbol()("Password needs to have one symbol."),
				s.longerThan(6)("Password needs to have more than 6 characters."),
			],
		},
	})

	$form.$on.submit = () => {
		// handle submit...
	}
</script>

<form on:submit={$form.$fn.submit}>
	<div>
		<ul>
			{#each $form.email.errors as error}
				<li>{error}</li>
			{/each}
		</ul>
		<input type="text" bind:value={$form.email.value} />
	</div>
	<div>
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

To create a svelidate form just use `svelidate(yourFormObject)` with an object representing your form, see the next form fields section for more information.
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

## Form fields

Only `value` is mandatory when creating a form field but you can also set all the other properties.
Here are all the available props per form field, after using `svelidate()` all of them will exist:

```ts,
const field = {
	value: T // the value to bind to the input
	validators: FormFieldValidator<T>[] // you can either import them or make your own
	errors: string[] // an array of errors messages returned by the failed validators
	touched: boolean // true if `value` got modified (submitting the form resets it to false)
	invalid: boolean // true if `errors.length` > 0
}
```

## Validators

### Default validators

Svelidate comes with multiple validators that you can use, they are grouped by category, `general` when they can be used for many value types (e.g. `required` or `truthy`), `string` to validate strings, `number` for numbers and `date` for dates.

#### `general`

```ts
const general = {
	truthy, // value is truthy (can be used to validate booleans/checkboxes).
	falsy, // value is falsy (can be used to validate booleans/checkboxes).
	required:, // value is truthy or strictly equal to 0.
	equalTo, // value is strictly equal to argument.
	differentFrom, // value is strictly different from argument.
}
```

#### `string`

```ts
// value must be a string
const string = {
	isEmail, // value is an e-mail.
	hasUpperCaseLetter, // value has atleast one upper case letter.
	hasLowerCaseLetter, // value has atleast one lower case letter.
	hasNumber, // value has atleast one number.
	hasSymbol, // value has atleast one symbol ( !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~), a custom symbol array can be given.
	matchesRegex, // value matches the given regex.
	longerThan, // value is longer than the given length.
	longerThanOrEqualTo, // value is longer than or equal to the given length.
	shorterThan, // value is shorter than the given length.
	shorterThanOrEqualTo, // value is shorter than or equal to the given length.
	lengthInRange, // value length is included in the given range.
	lengthOutOfRange, // value length is excluded from the given range.
	lengthDifferentFrom, // value length is different from the given one.
	lengthEqualTo, // value length is equal to the given one.
	equalTo, // value is equal to the given string.
	differentFrom, // value is different from the given string.,
}
```

#### `string`

```ts
// value must be a number
const number = {
	greaterThan, // value is greater than the given number.
	greaterThanorEqualTo, // value is greater than or equal to the given number.
	lesserThan, // value is lesser than the given number.
	lesserThanOrEqualTo, // value is lesser than or equal to the given number.
	inInterval, // value is in included in the given interval.
	outOfInterval, // value is in excluded from the given interval.
	differentFrom, // value is different from the given number.
	equalTo, // value is equal to the given number.
}
```

#### `string`

```ts
// value must be a string or a date, if it's a string it will be parsed using the `Date` constructor.
const date = {
	afterThe, // value is after the given date.
	afterTheOrEqualTo, // value is after the or is the given date.
	beforeThe, // value is before the given date.
	beforeTheOrEqualTo, // value is before the or is the given date.
	inRange, // value is between the given date range.
	outOfRange, // value is outside the given date range.
	differentFrom, // value is not the given date.
	equalTo, // value is the given date.
}
```

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

const isObject = createValidator(
	value => typeof value === "object",
	"This is not an object !"
)
const objectValidator = isObject() // this is what you use in form fields (`isObject()`)
objectValidator({}) // return undefined
objectValidator("string") // returns "This is not an object !"

// you can also pass params by wrapping it in another function:
const isNumberEqualTo = (number: number) => {
	return createNumberValidator(value => value === number)
}
const threeValidator = isNumberEqualTo(3)("This is not equal to 3 !")
threeValidator(3) // return undefined
threeValidator(69) // return "This is not equal to 3 !"
```
