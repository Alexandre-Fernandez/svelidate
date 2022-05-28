"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = exports.createValidator = void 0;
function createValidator(callback, defaultErrorMessage = "") {
    return (errorMessage = defaultErrorMessage) => (value) => {
        if (callback(value))
            return undefined; // no error
        return errorMessage;
    };
}
exports.createValidator = createValidator;
function getDate(value) {
    const date = typeof value === "string" ? new Date(value) : value;
    if (!(date instanceof Date))
        return undefined;
    if (isNaN(date.getTime()))
        return undefined;
    return date;
}
exports.getDate = getDate;
//# sourceMappingURL=utils.js.map