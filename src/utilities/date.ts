import { HtmlDateTimeInputType, SvelidateInputType } from "../types"

const MINUTE = 60000
const DAY = MINUTE * 60 * 24
const WEEK = DAY * 7
const MONTH = DAY * 31

const addSubstract = {
	"+": (a: number, b: number) => a + b,
	"-": (a: number, b: number) => a - b,
}

export function getDate(value: unknown) {
	const date = typeof value === "string" ? new Date(value) : value
	if (!(date instanceof Date)) return undefined
	if (isNaN(date.getTime())) return undefined
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
	switch (inputType) {
		case "date":
			return new Date(addSubstract[mode](date.getTime(), DAY))
		case "datetime-local":
			return new Date(addSubstract[mode](date.getTime(), MINUTE))
		case "month":
			return new Date(addSubstract[mode](date.getTime(), MONTH))
		case "time":
			return new Date(addSubstract[mode](date.getTime(), MINUTE))
		case "week":
			return new Date(addSubstract[mode](date.getTime(), WEEK))
	}
}

/**
 * Returns a string corresponding to the correct date format for the given `inputType`.
 */
export function getFormattedDate(date: Date, inputType: HtmlDateTimeInputType) {
	switch (inputType) {
		case "date":
			return `${yyyyMm(date)}-${getDays(date)}`
		case "datetime-local":
			return `${yyyyMm(date)}-${getDays(date)}T${hhMM(date)}`
		case "month":
			return yyyyMm(date)
		case "time":
			return hhMM(date)
		case "week":
			return `${date.getFullYear()}-W${zerify(getWeeks(date))}`
	}
}

function getWeeks(date: Date) {
	var d = new Date(date.getTime())
	d.setHours(0, 0, 0, 0)
	d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
	var week1 = new Date(d.getFullYear(), 0, 4)
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

function getDays(date: Date) {
	return zerify(date.getDate())
}

function hhMM(date: Date, separator = ":") {
	return `
	${zerify(date.getHours() + 1)}
	${separator}
	${zerify(date.getMinutes())}
	`
}

function yyyyMm(date: Date, separator = "-") {
	return `${date.getFullYear()}${separator}${zerify(date.getMonth() + 1)}`
}

function zerify(number: number) {
	const str = String(number)
	if (str.length === 0) return "00"
	if (str.length === 1) return `0${str}`
	return str
}
