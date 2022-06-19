"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTextareaInput = exports.isStringInput = exports.isDateInput = exports.isNumberInput = exports.getMatchingHtmlValidator = void 0;
const inputGroupMap = {
    textarea: ["textarea"],
    numbers: ["number", "range"],
    dates: ["date", "datetime-local", "month", "time", "week"],
    strings: ["email", "password", "search", "tel", "text", "url"],
};
function getMatchingHtmlValidator(inputType, htmlValidatorMapperMap) {
    var _a, _b;
    if (!inputType)
        return {};
    for (const group in inputGroupMap) {
        const g = group;
        if (inputGroupMap[g].some(type => type === inputType)) {
            // FIXME Type 'string' is not assignable to type 'never' (`inputType as never`)
            return (_b = (_a = htmlValidatorMapperMap[g]) === null || _a === void 0 ? void 0 : _a.call(htmlValidatorMapperMap, inputType)) !== null && _b !== void 0 ? _b : {};
        }
    }
    return {};
}
exports.getMatchingHtmlValidator = getMatchingHtmlValidator;
function isNumberInput(inputType) {
    return inputGroupMap.numbers.some(type => type === inputType);
}
exports.isNumberInput = isNumberInput;
function isDateInput(inputType) {
    return inputGroupMap.dates.some(type => type === inputType);
}
exports.isDateInput = isDateInput;
function isStringInput(inputType) {
    return inputGroupMap.strings.some(type => type === inputType);
}
exports.isStringInput = isStringInput;
function isTextareaInput(inputType) {
    return inputGroupMap.textarea.some(type => type === inputType);
}
exports.isTextareaInput = isTextareaInput;
//# sourceMappingURL=input.js.map