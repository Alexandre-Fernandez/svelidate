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

-   Star the [github repo](https://github.com/alexandre-fernandez/svelidate) 😎

```ts
<script lang="ts">
	import { svelidate, string } from "$src"

	const form = svelidate({
		email: {
			value: "",
			type: "email" /* Defining `type` is not mandatory but will enable
			HTML5 validation generation. By default HTML5 validation will only
			work when JS is disabled */,
			validators: [
				string.required("The e-mail field is required."),
				string.email("Please enter a valid email."),
			],
		},
		password: {
			value: "",
			type: "password",
			validators: [
				string.required("The password field is required."),
				string.lowerCase(
					"Password needs to have atleast one lower case letter."
				),
				string.upperCase(
					"Password needs to have atleast one upper case letter."
				),
				string.number("Password needs to have atleast one number."),
				string.symbol("Password needs to have one symbol."),
				string.length.gt(6)(
					"Password needs to have more than 6 characters."
				),
			],
		},
		confirmation: {
			value: "",
			type: "password",
			validators: [
				string.required("The password confirmation field is required."),
				string.eq(form => form.password.value)(
					"Password confirmation must be equal to the password field."
				),
			],
		},
	})

	$form.$on.submit = () => {
		/* handle submit... */
	}
</script>
```

```svelte
<form bind:this={$form.$el}>
	<ul>
		{#each $form.$st.errors as error}
			<li>{error}</li>
		{/each}
	</ul>

	<input
		bind:value={$form.email.value}
		{...$form.email.attributes}
		type="email"
	/>

	<input
		bind:value={$form.password.value}
		{...$form.password.attributes}
		type="password"
	/>

	<input
		bind:value={$form.confirmation.value}
		{...$form.confirmation.attributes}
		type="password"
	/>

	<button disabled={$form.$st.invalid}>Submit</button>
</form>
```

```css
<style>
	input:valid {
		background: lightgreen;
	}
	input:invalid {
		background: lightcoral;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style-position: inside;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 32rem;
		gap: 1rem;
	}
</style>

```

## Configuration

You can modify Svelidate's default or local configuration.

-   To modify the default configuration for all `svelidate` functions change this importable configuration object: `svelidateConfig`.
-   To modify the configuration of one form instance, pass the modification you want to apply to the default configuration as a second argument in the `svelidate` function.

```ts
{
	mode, /*
	A string indicating which validation mode to use:
		- "default": The default value, uses html only on the server or if
		javascript is disabled, and javascript only otherwise.
		- "all": Uses both html and javascript validation.
		- "js-only": Only uses javascript to validate the binded value.
		- "html-only": Only uses html to validate the input.
	*/
	pattern: { /*
	An object containing regular expression used by the default validators, these
	can be modified to behave differently (e.g. you don't want to count "_" as
	a symbol).
	*/
		symbol, /*
		Pattern used for string.symbol, searches for the following symbols:
		!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ .
		*/
		email /*
		Pattern used for string.email.
		*/
	},
}
```

## Form

The Svelidate form object is created from an object representing your desired form.
It's made of field names containing [objects reprensenting your fields](#fields), and top level objects added by Svelidate, beginning with `$`.

### `$st` (state)

```ts
{
	invalid, /*
	A boolean that will be true if any of the form's fields is invalid.
	*/
	submitted, /*
	A boolean that will be true once `$form.$fn.submit` has been called.
	*/
	initial, /*
	The original form passed to `svelidate` to create the svelidate form.
	*/
	errors, /*
	An array of all the current form errors.
	*/
}
```

### `$fn` (functions)

```ts
{
	submit, /*
	Handles submit internally and then calls the function stored in `$form.$on.submit`.
	*/
	reset, /*
	Resets all fields to their initial value.
	*/
	untouch, /*
	Reset all fields' `touched` property to false. If you only need to reset one
	you can just do `$form.field.touched = false`.
	*/
	getErrors, /*
	Returns all the current field's errors merged into one array.
	*/
}
```

### `$on` (event handlers)

```ts
{
	submit, /*
	Called after submitting with `$form.$fn.submit`.
	*/
	touch, /*
	Called everytime an input is touched (from false to true).
	*/
}
```

### `$el`

Not an object, but a reference to the HTML form element, meant to be binded.

## Fields

Fields are used to describe your inputs and create your svelidate form.
The only required property is `value` which should be binded to an input.
If you want your field to be able to have html validation you will need to set `field.type` to the corresponding input type.

```ts
{
	value, /*
	Used to bind the input's value/checked/etc.
	*/
	validators, /*
	An array of validators, import them or make your own, see the validator
	section.
	*/
	type, /*
	The HTML input type to use to generate the HTML5 validation attributes.
	*/
	touched, /*
	Boolean indicating if `value` was modified (submitting the form resets
	it to false), it's initial value can be set to true.
	*/
	attributes, /*
	__Partially generated by svelidate__
	An object containing all the input's attributes (the name attribute is
	automatically set to the field object's key name).
	The HTML5 validation attributes will be added to this object.
	It is meant to be spread in the HTML input.
	The title attribute can be used as an error message for the HTML validation
	of string inputs (text, email, password, search, tel, url).
	*/
	errors, /*
	__Generated by svelidate__
	An error message array corresponding to the	invalid javascript validators.
	*/
	invalid, /*
	__Generated by svelidate__
	A boolean that will be true if `errors.length > 0` and false otherwise.
	*/
}
```

## Validators

There's two kinds of validators in Svelidate, html and javascript.
When you fill the `validators` array inside your [field](#fields) with the [default validators](#default-validators), you are actually creating validation objects called validator wrappers:

```ts
{
	js: (inputValue) => string | undefined, /*
	A javascript validator takes the current input's value as an argument and outputs an error message or undefined if the value is valid.
	The error messages from the javascript validator are the ones found in `$form.field.errors`.
	*/
	html: (inputType) => { ...validationAttributes } /*
	The html validator is optional, it takes the input's type (retrieved from `$form.field.attributes.type`), if it's not undefined it will output an object containing html validation attributes (min, max, etc).
	The field attributes found in `$form.field.attributes` will be appended with the output of your html validators.
	*/
}
```

Replacing any function by an object following the `ValidatorWrapper` model will work, check [custom validators](#custom-validators) for more information.
HTML validators distinguish and will only validate the following **input type groups** :

-   **textarea** ("textarea")
-   **file** ("file")
-   **checkbox** ("checkbox")
-   **numbers** ("number", "range")
-   **strings** ("email", "password", "search", "tel", "text", "url")
-   **dates** ("date", "datetime-local", "month", "time", "week")
-   **select** ("select-multiple", "select-one")
-   **color** ("color")
-   **radio** ("radio")
-   **other** ("hidden", "reset", "submit")

### Default validators

Default validators are functions helping you to easily validate your forms.
They can take a custom error (e.g. a translation key) that will be used for your javascript validator.
They are grouped by input value type inside an importable object.

#### `boolean`

**If the passed value is not a boolean it will be parsed as one using the truthy & falsy rules.**

```ts
{
	true /*     | HTML: Validates checkbox group |
	Valid if the value is true.
	*/,
	false /*     | HTML: No validation |
	Valid if the value is false.
	*/,
}
```

#### `string`

**If the passed value is not a string it will be parsed with the `toString` method (if it exists), if it's still not a string it will be invalid.**

```ts
{
	required /*     | HTML: Validates textarea and strings groups |
	Valid if the string is atleast one character.
	*/,
	email /*     | HTML: Validates textarea (only input length) and strings groups |
	Valid if the string matches the email pattern.
	*/,
	upperCase /*     | HTML: Validates strings group |
	Valid if the string has atleast an upper case letter.
	*/,
	lowerCase /*     | HTML: Validates strings group |
	Valid if the string has atleast a lower case letter.
	*/,
	number /*     | HTML: Validates strings group |
	Valid if the string has atleast one number.
	*/,
	symbol /*     | HTML: Validates strings group |
	Valid if the string has atleast one symbol ( !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~).
	*/,
	regex /*     | HTML: Validates strings group |
	Valid if the string matches the given regex.
	*/,
	eq /*     | HTML: Validates strings group |
	Valid if the string is strictly equal to the given string.
	*/,
	neq /*     | HTML: Validates strings group |
	Valid if the string is strictly different from the given string.
	*/,
	length: {
		gt /*     | HTML: Validates textarea and strings groups |
		Valid if the string is longer than the given length.
		*/,
		gte /*     | HTML: Validates textarea and strings groups |
		Valid if the string is longer than or equal to the given length.
		*/,
		lt /*     | HTML: Validates textarea and strings groups |
		Valid if the string is shorter than the given length.
		*/,
		lte /*     | HTML: Validates textarea and strings groups |
		Valid if the string is shorter than or equal to the given length.
		*/,
		inside /*      | HTML: Validates textarea and strings groups |
		Valid if the string's length is inside the given interval.
		*/,
		outside /*     | HTML: Validates strings group |
		Valid if the string's length is outside the given interval.
		*/,
		neq /*     | HTML: Validates strings group |
		Valid if the string's length is strictly different from the given length.
		*/,
		eq /*     | HTML: Validates textarea and strings groups |
		Valid if the string's length is strictly equal to the given length.
		*/,
	},
}
```

#### `number`

**If the passed value is not a number it will be parsed with `parseFloat`, if it's still not a number it will be invalid.**

```ts
{
	required /*     | HTML: Validates numbers group |
	Valid if the number can be parsed.
	*/,
	gt /*     | HTML: Validates numbers group |
	Valid if the number is greater than the given number.
	*/,
	gte /*     | HTML: Validates numbers group |
	Valid if the number is greater than or equal to the given number.
	*/,
	lt /*     | HTML: Validates numbers group |
	Valid if the number is lesser than the given number.
	*/,
	lte /*     | HTML: Validates numbers group |
	Valid if the number is lesser than or equal to the given number.
	*/,
	inside /*     | HTML: Validates numbers group |
	Valid if the number is inside the given interval.
	*/,
	outside /*     | HTML: No validation |
	Valid if the number is outside the given interval.
	*/,
	neq /*     | HTML: No validation |
	Valid if the number is strictly different from the given number.
	*/,
	eq /*     | HTML: Validates numbers group |
	Valid if the number is strictly equal to the given number.
	*/,
}
```

#### `date`

**If the passed value is not a date it will be parsed with the `Date` constructor, if it's still not a date it will be invalid.**

```ts
{
	required /*     | HTML: Validates dates group |
	Valid if the date can be parsed.
	*/,
	gt /*     | HTML: Validates dates group |
	Valid if the date is after the given date.
	*/,
	gte /*     | HTML: Validates dates group |
	Valid if the date is after or at the same time than the given date.
	*/,
	lt /*     | HTML: Validates dates group |
	Valid if the date is before the given date.
	*/,
	lte /*     | HTML: Validates dates group |
	Valid if the date is before or at the same time than the given date.
	*/,
	inside /*     | HTML: Validates dates group |
	Valid if the date is inside the given interval.
	*/,
	outside /*     | HTML: No validation |
	Valid if the date is outside the given interval.
	*/,
	neq /*     | HTML: No validation |
	Valid if the date is different from the given date.
	*/,
	eq /*     | HTML: Validates dates group |
	Valid if the date is equal to the given date.
	*/,
}
```

#### `filelist`

**If the passed value is not a FileList instance it will be invalid.**
The value will be a FileList if binded to a "file" input's `files` property.

```ts
const filelist = {
	required /*     | HTML: Validates file group |
	Valid if value is a FileList and has atleast one file.
	*/,
	files: {
		type: {
			image /*     | HTML: Validates file group |
			Valid if all files are images (	.tiff, .pjp, .jfif, .bmp, .gif, .png, .xbm,
			.dib, .jxl, .jpeg, .jpg, .webp, .ico, .tif, .pjpeg, .avif, .svg, .svgz)
			*/,
			raster: /*     | HTML: Validates file group |
			Valid if all files are raster images (.tiff, .pjp, .jfif, .bmp, .gif,
			.png, .xbm, .dib, .jxl, .jpeg, .jpg, .webp, .ico, .tif, .pjpeg, .avif)
			*/,
			vector: /*     | HTML: Validates file group |
			Valid if all files are vector images (.svg, .svgz)
			*/,
			video: /*     | HTML: Validates file group |
			Valid if all files are videos (.ogm, .wmv, .mpg, .webm, .ogv, .mov,
			.asx, .mpeg, .mp4, .m4v, .avi)
			*/,
			audio: /*     | HTML: Validates file group |
			Valid if all files are audio files (.opus, .flac, .webm, .weba, .wav,
			.ogg, .m4a, .oga, .mid, .mp3, .aiff, .wma, .au)
			*/,
			is /*     | HTML: Validates file group |
			Valid if all files' extensions are inside the given array.
			*/,
		},
		size: {
			gt /*     | HTML: No validation |
			Valid if all files are larger than the given size.
			*/,
			gte /*     | HTML: No validation |
			Valid if all files are larger than or equal to the given size.
			*/,
			lt /*     | HTML: No validation |
			Valid if all files are smaller than the given size.
			*/,
			lte /*     | HTML: No validation |
			Valid if all files are smaller than or equal to the given size.
			*/,
			inside /*     | HTML: No validation |
			Valid if all file sizes are in the given interval.
			*/,
			outside /*     | HTML: No validation |
			Valid if all file sizes are outside the given interval.
			*/,
			neq /*     | HTML: No validation |
			Valid if all file sizes are different from the given size.
			*/,
			eq /*     | HTML: No validation |
			Valid if all file sizes are equal to the given size.
			*/,
		},
	},
	length: {
		gt /*     | HTML: No validation |
		Valid if the FileList's length is greater than the given one.
		*/,
		gte /*     | HTML: No validation |
		Valid if the FileList's length is greater than or equal to the given one.
		*/,
		lt /*     | HTML: No validation |
		Valid if the FileList's length is lesser than the given one.
		*/,
		lte /*     | HTML: No validation |
		Valid if the FileList's length is lesser than or equal to the given one.
		*/,
		inside /*     | HTML: No validation |
		Valid if the FileList's length is in the given interval.
		*/,
		outside /*     | HTML: No validation |
		Valid if the FileList's length is outside the given interval.
		*/,
		neq /*     | HTML: No validation |
		Valid if the FileList's length is different from the given one.
		*/,
		eq /*     | HTML: No validation |
		Valid if the FileList's length is equal to the given one.
		*/,
	},
}
```

### Conditional validation

You can make a javascript validator or all the javascript validators in the `$form.field.validators` array depend on a condition to be able to return an error.

```ts
<script lang="ts">
	import { svelidate, string, general, validateIf } from "svelidate"

	const form = svelidate({
		email: {
			value: "",
			// This will only validate `$form.email.value` if it's longer than 5 characters.
			validators: validateIf(emailValue => emailValue.length > 5, [
				general.required("This field is required."),
				string.email("Please enter a valid email."),
			]),
		},
		password: {
			value: "",
			validators: [
				general.required("This field is required."),
				// This will stop lowercase validation after 8 characters.
				validateIf(
					passwordValue => passwordValue.length < 8
					string.lowerCase("Password needs to have atleast one lower case letter.")
				),
			],
			attributes: {
				type: "password",
			},
		},
	})
	$form.$on.submit = () => { /*handle submit...*/	}
</script>
```

### Custom validators

As seen in the [validators section](#validators) any object respecting [the `ValidatorWrapper` model](#validators) can be used as a validator.
However svelidates provides helpers that make that process easier, and enable you to easily make javascript validators with custom errors or sort the input type group in your html validators.

#### `ValidatorWrapper` factory creators

```ts
import {
	createValidatorWrapperFactory,
	createStringValidatorWrapperFactory /*
	Makes javascript validator return an error if the given value was not a string.
	*/,
	createNumberValidatorWrapperFactory /*
	Makes javascript validator try to parse the given value as a number with
	`parseFloat` and returns an error if the value was not a number.
	*/,
	createDateValidatorWrapperFactory /*
	Makes javascript validator try to parse the given value as a date the `Date`
	constructor and returns an error if the value was not a date.
	*/,
	createFileListValidatorWrapperFactory /*
	Makes javascript validator check if the value is an instance of `FileList`
	and returns an error if the value was not a `FileList`.
	*/,
	createBooleanValidatorWrapperFactory /*
	Makes javascript validator parse the value as a boolean.
	*/,
} from "svelidate"

const requiredValidatorWrapperFactory = createValidatorWrapperFactory(
	/* The first argument is a javascript predicate returning true if the value
	is valid or false otherwise. */
	fieldValue => {
		if (!fieldValue && fieldValue !== 0) return false
		return true
	},
	/* The second argument is a HTML validator creator, it takes the input type
	found in `$form.field.attributes.type` (which may be undefined) and returns
	the corresponding HTML input attributes to validate it. */
	inputType => ({ required: true })
)

/* The line below creates a ValidatorWrapper creator, this enables you to easily add
custom error messages. */
const requiredValidatorWrapper = requiredValidatorWrapperFactory(
	"This field is required !"
)

requiredValidatorWrapper.js("I am the current field value.") // Returns undefined (no error)
requiredValidatorWrapper.js("") // Returns "This field is required !"
requiredValidatorWrapper.html // In this case it'll always be { required: true }

/**
 * The other createValidatorWrapperFactory variants only add type checking/parsing to
 * the javascript predicate.
 */
```

#### getMatchingHtmlValidator helper

This functions makes creating HTML validators using `createValidatorWrapperFactory` much easier by enabling you to use a single callback by HTML input group.

```ts
import { getMatchingHtmlValidator } from "svelidate"

// We wrap `createValidatorWrapperFactory` to be able to pass arguments to it when used.
const equalValidatorWrapperFactory = (value: unknown) => {
	const parsedString = String(value)
	const parsedFloat = isNaN(parseFloat(parsedString))
		? undefined
		: parseFloat(parsedString)

	return createValidatorWrapperFactory(
		val => val === value,
		inputType =>
			getMatchingHtmlValidator(inputType, {
				// "textarea"
				textarea: textareaInput => ({}),
				// "email", "password", "search", "tel", "text", "url"
				strings: stringInput => ({
					pattern: `(?=^${parsedString}$)`,
				}),
				// "number", "range"
				numbers: numberInput => ({
					min: parsedFloat,
					max: parsedFloat,
				}),
				// "date", "datetime-local", "month", "time", "week"
				dates: dateInput => {
					const date = getDate(value)
					if (!date) return {}
					return {
						min: getFormattedDate(date, dateInput),
						max: getFormattedDate(date, dateInput),
					}
				},
			})
	)
}
```
