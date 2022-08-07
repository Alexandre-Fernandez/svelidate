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
				const [getAllowedExtensions, wasValue] = createValidatorGetter(
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
						}),
					wasValue
				)
			},
		},
		size: {
			gt(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const [getSize, wasValue] = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size > toBytes(getSize(form), unit)
						),
					() => ({}),
					wasValue
				)
			},
			gte(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const [getSize, wasValue] = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size >= toBytes(getSize(form), unit)
						),
					() => ({}),
					wasValue
				)
			},
			lt(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const [getSize, wasValue] = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size < toBytes(getSize(form), unit)
						),
					() => ({}),
					wasValue
				)
			},
			lte(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const [getSize, wasValue] = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size <= toBytes(getSize(form), unit)
						),
					() => ({}),
					wasValue
				)
			},
			inside(
				min: number | ValidatorGetterParam,
				max: number | ValidatorGetterParam,
				unit: ByteUnit = "b"
			) {
				const [getMin, wasMinValue] = createNumberValidatorGetter(min)
				const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file =>
								file.size >= toBytes(getMin(form), unit) &&
								file.size <= toBytes(getMax(form), unit)
						),
					() => ({}),
					wasMinValue && wasMaxValue
				)
			},
			outside(
				min: number | ValidatorGetterParam,
				max: number | ValidatorGetterParam,
				unit: ByteUnit = "b"
			) {
				const [getMin, wasMinValue] = createNumberValidatorGetter(min)
				const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file =>
								file.size < toBytes(getMin(form), unit) ||
								file.size > toBytes(getMax(form), unit)
						),
					() => ({}),
					wasMinValue && wasMaxValue
				)
			},
			neq(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const [getSize, wasValue] = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size !== toBytes(getSize(form), unit)
						),
					() => ({}),
					wasValue
				)
			},
			eq(size: number | ValidatorGetterParam, unit: ByteUnit = "b") {
				const [getSize, wasValue] = createNumberValidatorGetter(size)

				return createFileListValidatorWrapperFactory(
					(value, form) =>
						assert(
							value,
							file => file.size === toBytes(getSize(form), unit)
						),
					() => ({}),
					wasValue
				)
			},
		},
	},
	length: {
		gt(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length > getLength(form),
				() => ({}),
				wasValue
			)
		},
		gte(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length >= getLength(form),
				() => ({}),
				wasValue
			)
		},
		lt(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length < getLength(form),
				() => ({}),
				wasValue
			)
		},
		lte(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length <= getLength(form),
				() => ({}),
				wasValue
			)
		},
		inside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const [getMin, wasMinValue] = createNumberValidatorGetter(min)
			const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

			return createFileListValidatorWrapperFactory(
				(value, form) =>
					value.length >= getMin(form) &&
					value.length <= getMax(form),
				() => ({}),
				wasMinValue && wasMaxValue
			)
		},
		outside(
			min: number | ValidatorGetterParam,
			max: number | ValidatorGetterParam
		) {
			const [getMin, wasMinValue] = createNumberValidatorGetter(min)
			const [getMax, wasMaxValue] = createNumberValidatorGetter(max)

			return createFileListValidatorWrapperFactory(
				(value, form) =>
					value.length < getMin(form) && value.length > getMax(form),
				() => ({}),
				wasMinValue && wasMaxValue
			)
		},
		neq(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length !== getLength(form),
				() => ({}),
				wasValue
			)
		},
		eq(length: number | ValidatorGetterParam) {
			const [getLength, wasValue] = createNumberValidatorGetter(length)

			return createFileListValidatorWrapperFactory(
				(value, form) => value.length === getLength(form),
				() => ({}),
				wasValue
			)
		},
	},
}

export default filelist
