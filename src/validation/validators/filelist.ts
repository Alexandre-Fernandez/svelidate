import type { ByteUnit, FileExtension } from "../../types"
import {
	getExtension,
	isAudio,
	isImage,
	isVideo,
	rasterExtensions,
	vectorExtensions,
} from "../../utilities/file"
import { toBytes } from "../../utilities/general"
import { getMatchingHtmlValidator } from "../../utilities/input"
import { createFileListValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

const filelist = {
	required: createFileListValidatorWrapperFactory(
		value => value.length > 0,
		() => ({ required: true })
	),
	files: {
		type: {
			image: createFileListValidatorWrapperFactory(
				value => assert(value, file => isImage(file.name)),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						file: () => ({ accept: "image/*" }),
					})
			),
			raster: createFileListValidatorWrapperFactory(
				value => assert(value, file => isImage(file.name, "raster")),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						file: () => ({ accept: rasterExtensions.join(",") }),
					})
			),
			vector: createFileListValidatorWrapperFactory(
				value => assert(value, file => isImage(file.name, "vector")),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						file: () => ({ accept: vectorExtensions.join(",") }),
					})
			),
			video: createFileListValidatorWrapperFactory(
				value => assert(value, file => isVideo(file.name)),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						file: () => ({ accept: "video/*" }),
					})
			),
			audio: createFileListValidatorWrapperFactory(
				value => assert(value, file => isAudio(file.name)),
				inputType =>
					getMatchingHtmlValidator(inputType, {
						file: () => ({ accept: "audio/*" }),
					})
			),
			is: (allowedExtensions: FileExtension[]) =>
				createFileListValidatorWrapperFactory(
					value =>
						assert(value, file =>
							allowedExtensions.some(
								ext => ext === getExtension(file.name)
							)
						),
					inputType =>
						getMatchingHtmlValidator(inputType, {
							file: () => ({
								accept: allowedExtensions.join(","),
							}),
						})
				),
		},
		size: {
			gt(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => assert(value, file => file.size > bytes),
					() => ({})
				)
			},
			gte(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => assert(value, file => file.size >= bytes),
					() => ({})
				)
			},
			lt(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => assert(value, file => file.size < bytes),
					() => ({})
				)
			},
			lte(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => assert(value, file => file.size <= bytes),
					() => ({})
				)
			},
			inside(min: number, max: number, unit: ByteUnit = "b") {
				const bytesMin = toBytes(min, unit)
				const bytesMax = toBytes(max, unit)
				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file =>
								file.size >= bytesMin && file.size <= bytesMax
						),
					() => ({})
				)
			},
			outside(min: number, max: number, unit: ByteUnit = "b") {
				const bytesMin = toBytes(min, unit)
				const bytesMax = toBytes(max, unit)
				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file => file.size < bytesMin || file.size > bytesMax
						),
					() => ({})
				)
			},
			neq(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => assert(value, file => file.size !== bytes),
					() => ({})
				)
			},
			eq(size: number, unit: ByteUnit = "b") {
				const bytes = toBytes(size, unit)
				return createFileListValidatorWrapperFactory(
					value => assert(value, file => file.size === bytes),
					() => ({})
				)
			},
		},
	},
	length: {
		gt(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length > length,
				() => ({ multiple: true })
			)
		},
		gte(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length >= length,
				() => ({ multiple: true })
			)
		},
		lt(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length < length,
				() => (length <= 2 ? {} : { multiple: true })
			)
		},
		lte(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length <= length,
				() => (length <= 1 ? {} : { multiple: true })
			)
		},
		inside(min: number, max: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length >= min && value.length <= max,
				() => (max <= 1 ? {} : { multiple: true })
			)
		},
		outside(min: number, max: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length < min && value.length > max,
				() => ({ multiple: true })
			)
		},
		neq(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length !== length,
				() => ({ multiple: true })
			)
		},
		eq(length: number) {
			return createFileListValidatorWrapperFactory(
				value => value.length === length,
				() => (length <= 1 ? {} : { multiple: true })
			)
		},
	},
}

function assert(filelist: FileList, assertion: (file: File) => boolean) {
	for (let i = 0; i < filelist.length; i++) {
		if (!assertion(filelist[i])) return false
	}
	return true
}

export default filelist
