"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateValidatorWrapperFactory = exports.createNumberValidatorWrapperFactory = exports.createStringValidatorWrapperFactory = exports.createValidatorWrapperFactory = void 0;
const date_1 = require("../../utilities/date");
function createValidatorWrapperFactory(jsValidatorPredicate, htmlValidator = () => ({})) {
    return (error = "") => Object.freeze({
        js: value => {
            if (jsValidatorPredicate(value))
                return undefined; // no error
            return error;
        },
        html: htmlValidator,
    });
}
exports.createValidatorWrapperFactory = createValidatorWrapperFactory;
function createStringValidatorWrapperFactory(jsValidatorPredicate, htmlValidator = () => ({})) {
    return (error = "") => Object.freeze({
        js: value => {
            if (typeof value !== "string")
                return error;
            if (jsValidatorPredicate(value))
                return undefined; // no error
            return error;
        },
        html: htmlValidator,
    });
}
exports.createStringValidatorWrapperFactory = createStringValidatorWrapperFactory;
function createNumberValidatorWrapperFactory(jsValidatorPredicate, htmlValidator = () => ({})) {
    return (error = "") => Object.freeze({
        js: value => {
            const number = typeof value === "number"
                ? value
                : parseFloat(String(value));
            if (isNaN(number))
                return error;
            if (jsValidatorPredicate(number))
                return undefined; // no error
            return error;
        },
        html: htmlValidator,
    });
}
exports.createNumberValidatorWrapperFactory = createNumberValidatorWrapperFactory;
function createDateValidatorWrapperFactory(jsValidatorPredicate, htmlValidator = () => ({})) {
    return (error = "") => Object.freeze({
        js: value => {
            const date = (0, date_1.getDate)(value);
            if (!date)
                return error;
            if (jsValidatorPredicate(date))
                return undefined; // no error
            return error;
        },
        html: htmlValidator,
    });
}
exports.createDateValidatorWrapperFactory = createDateValidatorWrapperFactory;
//# sourceMappingURL=validatorCollectionFactory.js.map