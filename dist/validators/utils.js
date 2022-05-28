"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateValidator = exports.createNumberValidator = exports.createStringValidator = exports.createValidator = exports.getDate = void 0;
function getDate(value) {
    const date = typeof value === "string" ? new Date(value) : value;
    if (!(date instanceof Date))
        return undefined;
    if (isNaN(date.getTime()))
        return undefined;
    return date;
}
exports.getDate = getDate;
function createValidator(callback, defaultErrorMessage = "") {
    return (errorMessage = defaultErrorMessage) => (value) => {
        if (callback(value))
            return undefined; // no error
        return errorMessage;
    };
}
exports.createValidator = createValidator;
function createStringValidator(callback, defaultErrorMessage = "") {
    return (errorMessage = defaultErrorMessage) => (value) => {
        if (typeof value !== "string")
            return errorMessage;
        if (callback(value))
            return undefined; // no error
        return errorMessage;
    };
}
exports.createStringValidator = createStringValidator;
function createNumberValidator(callback, defaultErrorMessage = "") {
    return (errorMessage = defaultErrorMessage) => (value) => {
        if (typeof value !== "number")
            return errorMessage;
        if (callback(value))
            return undefined; // no error
        return errorMessage;
    };
}
exports.createNumberValidator = createNumberValidator;
function createDateValidator(callback, defaultErrorMessage = "") {
    return (errorMessage = defaultErrorMessage) => (value) => {
        const date = typeof value === "string" ? new Date(value) : value;
        if (!(date instanceof Date))
            return errorMessage;
        if (isNaN(date.getTime()))
            return errorMessage;
        if (callback(date))
            return undefined; // no error
        return errorMessage;
    };
}
exports.createDateValidator = createDateValidator;
//# sourceMappingURL=utils.js.map