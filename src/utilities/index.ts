import type { HtmlDateTimeInputType, SvelidateInputType } from "../types/html"
import type { ByteUnit } from "../types/misc"
import {
	addSubstract,
	audioExtensions,
	DAY,
	MINUTE,
	MONTH,
	rasterExtensions,
	vectorExtensions,
	videoExtensions,
	WEEK,
} from "./constants"

export function mergeObjects(
	obj1: Record<PropertyKey, any>,
	obj2: Record<PropertyKey, any>
) {
	Object.entries(obj2).forEach(([key, value]) => {
		// eslint-disable-next-line no-param-reassign
		obj1[key] = value
	})
}

export function isLookahead(pattern: string) {
	if (pattern.length < 4) return false
	if (pattern[pattern.length - 1] !== ")") return false
	if (pattern[0] !== "(" || pattern[1] !== "?") return false
	if (pattern[2] !== "=" && pattern[2] !== "!") return false
	return true
}

// ANCHOR Date

function getWeeks(date: Date) {
	const d = new Date(date.getTime())
	d.setHours(0, 0, 0, 0)
	d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
	const week1 = new Date(d.getFullYear(), 0, 4)
	return (
		1 +
		Math.round(
			((d.getTime() - week1.getTime()) / 86400000 -
				3 +
				((week1.getDay() + 6) % 7)) /
				7
		)
	)
}

function zerify(number: number) {
	const str = String(number)
	if (str.length === 0) return "00"
	if (str.length === 1) return `0${str}`
	return str
}

function getDays(date: Date) {
	return zerify(date.getDate())
}

function hhMM(date: Date, separator = ":") {
	return `${zerify(date.getHours())}${separator}${zerify(date.getMinutes())}`
}

function yyyyMm(date: Date, separator = "-") {
	return `${date.getFullYear()}${separator}${zerify(date.getMonth() + 1)}`
}

/**
 * Returns `value` as a `Date` if it is one or can be parsed as one or undefined.
 */
export function getDate(value: unknown) {
	const date = typeof value === "string" ? new Date(value) : value
	if (!(date instanceof Date)) return undefined
	if (Number.isNaN(date.getTime())) return undefined
	return date
}

/**
 * Returns a bigger or smaller date from the given one depending on the `mode` & `inputType`.
 * It will add/substract the minimum amount of time depending on the `inputType`.
 */
export function getExcludedDate(
	date: Date,
	inputType: SvelidateInputType,
	mode: keyof typeof addSubstract
) {
	const d = getDate(date)
	if (!d) return undefined
	switch (inputType) {
		case "date":
			return new Date(addSubstract[mode](d.getTime(), DAY))
		case "datetime-local":
			return new Date(addSubstract[mode](d.getTime(), MINUTE))
		case "month":
			return new Date(addSubstract[mode](d.getTime(), MONTH))
		case "time":
			return new Date(addSubstract[mode](d.getTime(), MINUTE))
		case "week":
			return new Date(addSubstract[mode](d.getTime(), WEEK))
		default:
			return undefined
	}
}

/**
 * Returns a string corresponding to the correct date format for the given `inputType`.
 */
export function getFormattedDate(date: Date, inputType: HtmlDateTimeInputType) {
	const d = getDate(date)
	if (!d) return ""
	switch (inputType) {
		case "date":
			return `${yyyyMm(d)}-${getDays(d)}`
		case "datetime-local":
			return `${yyyyMm(d)}-${getDays(d)}T${hhMM(d)}`
		case "month":
			return yyyyMm(d)
		case "time":
			return hhMM(d)
		case "week":
			return `${d.getFullYear()}-W${zerify(getWeeks(d))}`
		default:
			return ""
	}
}

// ANCHOR File

export function getExtension(filename: string) {
	const index = filename.lastIndexOf(".")
	if (index === -1) return undefined
	return filename.substring(index)
}

export function isVideo(filename: string) {
	const extension = getExtension(filename)
	return videoExtensions.some(ext => ext === extension)
}

export function isAudio(filename: string) {
	const extension = getExtension(filename)
	return audioExtensions.some(ext => ext === extension)
}

export function isImage(filename: string, type?: "raster" | "vector") {
	const extension = getExtension(filename)
	switch (type) {
		case "raster":
			return rasterExtensions.some(ext => ext === extension)
		case "vector":
			return vectorExtensions.some(ext => ext === extension)
		case undefined:
			return (
				rasterExtensions.some(ext => ext === extension) ||
				vectorExtensions.some(ext => ext === extension)
			)
		default:
			return false
	}
}

export function toBytes(size: number, unit: ByteUnit) {
	switch (unit) {
		case "b":
			return size
		case "kb":
			return size * 1024
		case "mb":
			return size * 1048576
		case "gb":
			return size * 1073741824
		case "tb":
			return size * 1099511627776
		default:
			return -1
	}
}
