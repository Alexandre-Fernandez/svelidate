import type { ByteUnit } from "../../types"
import { toBytes } from "../../utilities/general"
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
	files: {
		type: {},
		size: {
			gt(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (value[i].size <= bytes) return false
						}
						return true
					},
					() => ({})
				)
			},
			gte(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (value[i].size < bytes) return false
						}
						return true
					},
					() => ({})
				)
			},
			lt(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (value[i].size >= bytes) return false
						}
						return true
					},
					() => ({})
				)
			},
			lte(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (value[i].size > bytes) return false
						}
						return true
					},
					() => ({})
				)
			},
			inside(min: number, max: number, unit: ByteUnit = "b") {
				const bytesMin = toBytes(min, unit)
				const bytesMax = toBytes(max, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (value[i].size < bytesMin) return false
							if (value[i].size > bytesMax) return false
						}
						return true
					},
					() => ({})
				)
			},
			outside(min: number, max: number, unit: ByteUnit = "b") {
				const bytesMin = toBytes(min, unit)
				const bytesMax = toBytes(max, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (
								value[i].size >= bytesMin &&
								value[i].size <= bytesMax
							) {
								return false
							}
						}
						return true
					},
					() => ({})
				)
			},
			neq(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (value[i].size === bytes) return false
						}
						return true
					},
					() => ({})
				)
			},
			eq(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => {
						for (let i = 0; i < value.length; i++) {
							if (value[i].size !== bytes) return false
						}
						return true
					},
					() => ({})
				)
			},
		},
	},
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
