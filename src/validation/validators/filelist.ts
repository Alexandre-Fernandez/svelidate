import type { ByteUnit } from "../../types"
import { isAudio, isImage, isVideo } from "../../utilities/file"
import { toBytes } from "../../utilities/general"
import { getMatchingHtmlValidator } from "../../utilities/input"
import { createFileListValidatorWrapperFactory } from "../factories/validatorCollectionFactory"

// formats
// size
// number of files
// filenames ?
/*
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

image/*
".tiff", ".pjp", ".jfif", ".bmp", ".gif", ".svg", ".png", ".xbm", ".dib", ".jxl", ".jpeg", 
".svgz", ".jpg", ".webp", ".ico", ".tif", ".pjpeg", ".avif"
video/*
".ogm", ".wmv", ".mpg", ".webm", ".ogv", ".mov", ".asx", ".mpeg", ".mp4", ".m4v", ".avi"
audio/*
".opus", ".flac", ".webm", ".weba", ".wav", ".ogg", ".m4a", ".oga", ".mid", ".mp3", ".aiff", ".wma", ".au"
*/

const filelist = {
	required: createFileListValidatorWrapperFactory(
		value => value.length > 0,
		() => ({ required: true })
	),
	files: {
		type: {
			image: createFileListValidatorWrapperFactory(
				value => assert(value, file => isImage(file.name)),
				() => ({})
			),
			raster: createFileListValidatorWrapperFactory(
				value => assert(value, file => isImage(file.name, "raster")),
				() => ({})
			),
			vector: createFileListValidatorWrapperFactory(
				value => assert(value, file => isImage(file.name, "vector")),
				() => ({})
			),
			video: createFileListValidatorWrapperFactory(
				value => assert(value, file => isVideo(file.name)),
				() => ({})
			),
			audio: createFileListValidatorWrapperFactory(
				value => assert(value, file => isAudio(file.name)),
				() => ({})
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

function assert(filelist: FileList, assertion: (file: File) => boolean) {
	for (let i = 0; i < filelist.length; i++) {
		if (!assertion(filelist[i])) return false
	}
	return true
}

export default filelist
