import { getMatchingHtmlValidator } from "../../utilities/input"
import { createFileListValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

// formats
// size
// number of files
// filenames ?

const filelist = {
	required: createFileListValidatorWrapperFactory(
		value => value.length > 0,
		() => ({ required: true })
	),
	length: {
		gt(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length > length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(length) + 1,
						}),
						textarea: () => ({
							minLength: Math.floor(length) + 1,
						}),
					})
			)
		},
		gte(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length >= length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(length),
						}),
						textarea: () => ({
							minLength: Math.floor(length),
						}),
					})
			)
		},
		lt(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length < length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(length) - 1,
						}),
						textarea: () => ({
							maxLength: Math.floor(length) - 1,
						}),
					})
			)
		},
		lte(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length <= length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							maxLength: Math.floor(length),
						}),
						textarea: () => ({
							maxLength: Math.floor(length),
						}),
					})
			)
		},
		inside(min: number, max: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length >= min && value.length <= max,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(min),
							maxLength: Math.floor(max),
						}),
						textarea: () => ({
							minLength: Math.floor(min),
							maxLength: Math.floor(max),
						}),
					})
			)
		},
		outside(min: number, max: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length < min && value.length > max,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								Math.max(0, min - 1)
							)}}|.{${Math.floor(max + 1)},})$)`,
						}),
					})
			)
		},
		neq(length: number) {
			const min = Math.max(Math.floor(length) - 1, 0)
			const max = Math.floor(length) + 1
			return createFileListValidatorWrapperFactory(
				value => value.length !== length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							pattern: `(?=(.{0,${Math.floor(
								min
							)}}|.{${Math.floor(max)},})$)`,
						}),
					})
			)
		},
		eq(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length === length,
				inputType =>
					getMatchingHtmlValidator(inputType, {
						strings: () => ({
							minLength: Math.floor(length),
							maxLength: Math.floor(length),
						}),
						textarea: () => ({
							minLength: Math.floor(length),
							maxLength: Math.floor(length),
						}),
					})
			)
		},
	},
}

/*

{
	validators: [filelist.required, filelist.length.eq(1)(""), filelist.files.size.gt()()]
}

let File = {
	name: "black.png",
	lastModified: 1643617999316,
	webkitRelativePath: "",
	size: 144, // bytes
	type: "image/png",
}
{
	name: "rotated-phone.xcf",
	lastModified: 1644198965043,
	webkitRelativePath: "",
	size: 678609,
	type: "image/x-xcf",
}
{
	name: "rabbit.mp4",
	lastModified: 1468153484000,
	webkitRelativePath: "",
	size: 346861418,
	type: "video/mp4",
}

*/

export default filelist
