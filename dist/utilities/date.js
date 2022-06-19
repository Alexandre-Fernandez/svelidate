"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedDate = exports.getExcludedDate = exports.getDate = void 0;
const MINUTE = 60000;
const DAY = MINUTE * 60 * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 31;
const addSubstract = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
};
/**
 * Returns `value` as a `Date` if it is one or can be parsed as one or undefined.
 */
function getDate(value) {
    const date = typeof value === "string" ? new Date(value) : value;
    if (!(date instanceof Date))
        return undefined;
    if (isNaN(date.getTime()))
        return undefined;
    return date;
}
exports.getDate = getDate;
/**
 * Returns a bigger or smaller date from the given one depending on the `mode` & `inputType`.
 * It will add/substract the minimum amount of time depending on the `inputType`.
 */
function getExcludedDate(date, inputType, mode) {
    const d = getDate(date);
    if (!d)
        return;
    switch (inputType) {
        case "date":
            return new Date(addSubstract[mode](d.getTime(), DAY));
        case "datetime-local":
            return new Date(addSubstract[mode](d.getTime(), MINUTE));
        case "month":
            return new Date(addSubstract[mode](d.getTime(), MONTH));
        case "time":
            return new Date(addSubstract[mode](d.getTime(), MINUTE));
        case "week":
            return new Date(addSubstract[mode](d.getTime(), WEEK));
    }
}
exports.getExcludedDate = getExcludedDate;
/**
 * Returns a string corresponding to the correct date format for the given `inputType`.
 */
function getFormattedDate(date, inputType) {
    const d = getDate(date);
    if (!d)
        return "";
    switch (inputType) {
        case "date":
            return `${yyyyMm(d)}-${getDays(d)}`;
        case "datetime-local":
            return `${yyyyMm(d)}-${getDays(d)}T${hhMM(d)}`;
        case "month":
            return yyyyMm(d);
        case "time":
            return hhMM(d);
        case "week":
            return `${d.getFullYear()}-W${zerify(getWeeks(d))}`;
    }
}
exports.getFormattedDate = getFormattedDate;
function getWeeks(date) {
    var d = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    var week1 = new Date(d.getFullYear(), 0, 4);
    return (1 +
        Math.round(((d.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7));
}
function getDays(date) {
    return zerify(date.getDate());
}
function hhMM(date, separator = ":") {
    return `${zerify(date.getHours())}${separator}${zerify(date.getMinutes())}`;
}
function yyyyMm(date, separator = "-") {
    return `${date.getFullYear()}${separator}${zerify(date.getMonth() + 1)}`;
}
function zerify(number) {
    const str = String(number);
    if (str.length === 0)
        return "00";
    if (str.length === 1)
        return `0${str}`;
    return str;
}
//# sourceMappingURL=date.js.map