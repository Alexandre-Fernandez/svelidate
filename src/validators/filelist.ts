import type { ValidatorGetterParam } from "$src/types/svelidate/validators"
import type { ByteUnit, FileExtension } from "../types/misc"
import { getExtension, isAudio, isImage, isVideo, toBytes } from "../utilities"
import { rasterExtensions, vectorExtensions } from "../utilities/constants"
import {
	createFileListValidatorWrapperFactory,
	createNumberValidatorGetter,
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
			is: (allowedExtensions: FileExtension[] | ValidatorGetterParam) => {
				const getAllowedExtensions = createValidatorGetter(
					allowedExtensions,
					result =>
						Array.isArray(result) &&
						result.every(item => typeof item === "string"),
					[]
				)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(value, file =>
							getAllowedExtensions(form).some(
								ext => ext === getExtension(file.name)
							)
						),
					(inputType, form) =>
						getMatchingHtmlValidator(inputType, {
							file: () => ({
								accept: getAllowedExtensions(form).join(","),
							}),
						})
				)
			},
		},
		size: {
			gt(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const getSize = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size > toBytes(getSize(form), unit)
						),
					() => ({})
				)
			},
			gte(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const getSize = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size >= toBytes(getSize(form), unit)
						),
					() => ({})
				)
			},
			lt(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const getSize = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size < toBytes(getSize(form), unit)
						),
					() => ({})
				)
			},
			lte(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const getSize = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size <= toBytes(getSize(form), unit)
						),
					() => ({})
				)
			},
			inside(
				min: number | ValidatorGetterParam,
				max: number | ValidatorGetterParam,
				unit: ByteUnit = "b"
			) {
				const getMin = createNumberValidatorGetter(min)
				const getMax = createNumberValidatorGetter(max)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file =>
								file.size >= toBytes(getMin(form), unit) &&
								file.size <= toBytes(getMax(form), unit)
						),
					() => ({})
				)
			},
			outside(
				min: number | ValidatorGetterParam,
				max: number | ValidatorGetterParam,
				unit: ByteUnit = "b"
			) {
				const getMin = createNumberValidatorGetter(min)
				const getMax = createNumberValidatorGetter(max)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file =>
								file.size < toBytes(getMin(form), unit) ||
								file.size > toBytes(getMax(form), unit)
						),
					() => ({})
				)
			},
			neq(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const getSize = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size !== toBytes(getSize(form), unit)
						),
					() => ({})
				)
			},
			eq(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const getSize = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size === toBytes(getSize(form), unit)
						),
					() => ({})
				)
			},
		},
	},
	length: {
		gt(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length > getLength(form),
				() => ({})
			)
		},
		gte(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length >= getLength(form),
				() => ({})
			)
		},
		lt(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length < getLength(form),
				() => ({})
			)
		},
		lte(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length <= getLength(form),
				() => ({})
			)
		},
		inside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const getMin = createNumberValidatorGetter(min)
			const getMax = createNumberValidatorGetter(max)

			return createFileListValidatorWrapperFactory(
				(value, form) =>
					value.length >= getMin(form) &&
					value.length <= getMax(form),
				() => ({})
			)
		},
		outside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const getMin = createNumberValidatorGetter(min)
			const getMax = createNumberValidatorGetter(max)

			return createFileListValidatorWrapperFactory(
				(value, form) =>
					value.length < getMin(form) && value.length > getMax(form),
				() => ({})
			)
		},
		neq(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length !== getLength(form),
				() => ({})
			)
		},
		eq(length: number | ValidatorGetterParam) {
			const getLength = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length === getLength(form),
				() => ({})
			)
		},
	},
}

export default filelist
