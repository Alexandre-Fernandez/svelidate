import type { ByteUnit, FileExtension } from "../types/misc"
import { getExtension, isAudio, isImage, isVideo, toBytes } from "../utilities"
import { rasterExtensions, vectorExtensions } from "../utilities/constants"
import {
	createFileListValidatorWrapperFactory,
	createValidatorGetter,
} from "./factories"
import { getMatchingHtmlValidator } from "./helpers"

function assert(filelist: FileList, assertion: (file: File) => boolean) {
	for (let i = 0; i < filelist.length; i += 1) {
		if (!assertion(filelist[i])) return false
	}
	return true
}

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
			is: (
				allowedExtensions: FileExtension[] | (() => FileExtension[])
			) => {
				const getAllowedExtensions =
					createValidatorGetter(allowedExtensions)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(value, file =>
							getAllowedExtensions().some(
								ext => ext === getExtension(file.name)
							)
						),
					inputType =>
						getMatchingHtmlValidator(inputType, {
							file: () => ({
								accept: getAllowedExtensions().join(","),
							}),
						})
				)
			},
		},
		size: {
			gt(size: number | (() => number), unit: ByteUnit = "b") {
				const getSize = createValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file => file.size > toBytes(getSize(), unit)
						),
					() => ({})
				)
			},
			gte(size: number | (() => number), unit: ByteUnit = "b") {
				const getSize = createValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file => file.size >= toBytes(getSize(), unit)
						),
					() => ({})
				)
			},
			lt(size: number | (() => number), unit: ByteUnit = "b") {
				const getSize = createValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file => file.size < toBytes(getSize(), unit)
						),
					() => ({})
				)
			},
			lte(size: number | (() => number), unit: ByteUnit = "b") {
				const getSize = createValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file => file.size <= toBytes(getSize(), unit)
						),
					() => ({})
				)
			},
			inside(
				min: number | (() => number),
				max: number | (() => number),
				unit: ByteUnit = "b"
			) {
				const getMin = createValidatorGetter(min)
				const getMax = createValidatorGetter(max)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file =>
								file.size >= toBytes(getMin(), unit) &&
								file.size <= toBytes(getMax(), unit)
						),
					() => ({})
				)
			},
			outside(
				min: number | (() => number),
				max: number | (() => number),
				unit: ByteUnit = "b"
			) {
				const getMin = createValidatorGetter(min)
				const getMax = createValidatorGetter(max)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file =>
								file.size < toBytes(getMin(), unit) ||
								file.size > toBytes(getMax(), unit)
						),
					() => ({})
				)
			},
			neq(size: number | (() => number), unit: ByteUnit = "b") {
				const getSize = createValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file => file.size !== toBytes(getSize(), unit)
						),
					() => ({})
				)
			},
			eq(size: number | (() => number), unit: ByteUnit = "b") {
				const getSize = createValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					value =>
						assert(
							value,
							file => file.size === toBytes(getSize(), unit)
						),
					() => ({})
				)
			},
		},
	},
	length: {
		gt(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				value => value.length > getLength(),
				() => ({})
			)
		},
		gte(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				value => value.length >= getLength(),
				() => ({})
			)
		},
		lt(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				value => value.length < getLength(),
				() => ({})
			)
		},
		lte(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				value => value.length <= getLength(),
				() => ({})
			)
		},
		inside(min: number | (() => number), max: number | (() => number)) {
			const getMin = createValidatorGetter(min)
			const getMax = createValidatorGetter(max)

			return createFileListValidatorWrapperFactory(
				value => value.length >= getMin() && value.length <= getMax(),
				() => ({})
			)
		},
		outside(min: number | (() => number), max: number | (() => number)) {
			const getMin = createValidatorGetter(min)
			const getMax = createValidatorGetter(max)

			return createFileListValidatorWrapperFactory(
				value => value.length < getMin() && value.length > getMax(),
				() => ({})
			)
		},
		neq(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				value => value.length !== getLength(),
				() => ({})
			)
		},
		eq(length: number | (() => number)) {
			const getLength = createValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				value => value.length === getLength(),
				() => ({})
			)
		},
	},
}

export default filelist
