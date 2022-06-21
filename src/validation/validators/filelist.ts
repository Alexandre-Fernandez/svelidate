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
				() => ({})
			)
		},
		gte(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length >= length,
				() => ({})
			)
		},
		lt(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length < length,
				() => ({})
			)
		},
		lte(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length <= length,
				() => ({})
			)
		},
		inside(min: number, max: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length >= min && value.length <= max,
				() => ({})
			)
		},
		outside(min: number, max: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length < min && value.length > max,
				() => ({})
			)
		},
		neq(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length !== length,
				() => ({})
			)
		},
		eq(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length === length,
				() => ({})
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
