"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileListValidatorWrapperFactory = exports.createDateValidatorWrapperFactory = exports.createNumberValidatorWrapperFactory = exports.createStringValidatorWrapperFactory = exports.createBooleanValidatorWrapperFactory = exports.createValidatorWrapperFactory = void 0;
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
function createBooleanValidatorWrapperFactory(jsValidatorPredicate, htmlValidator = () => ({})) {
    return (error = "") => Object.freeze({
        js: value => {
            if (jsValidatorPredicate(!!value))
                return undefined; // no error
            return error;
        },
        html: htmlValidator,
    });
}
exports.createBooleanValidatorWrapperFactory = createBooleanValidatorWrapperFactory;
function createStringValidatorWrapperFactory(jsValidatorPredicate, htmlValidator = () => ({})) {
    return (error = "") => Object.freeze({
        js: value => {
            const string = typeof value === "string"
                ? value
                : value === null || value === void 0 ? void 0 : value.toString();
            if (typeof string !== "string")
                return error;
            if (jsValidatorPredicate(string))
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
function createFileListValidatorWrapperFactory(jsValidatorPredicate, htmlValidator = () => ({})) {
    return (error = "") => Object.freeze({
        js: value => {
            try {
                if (!(value instanceof FileList))
                    return error;
                if (jsValidatorPredicate(value))
                    return undefined;
                return error;
            }
            catch (err) {
                console.error(err);
                return error;
            }
        },
        html: htmlValidator,
    });
}
exports.createFileListValidatorWrapperFactory = createFileListValidatorWrapperFactory;
//# sourceMappingURL=validatorCollectionFactory.js.map