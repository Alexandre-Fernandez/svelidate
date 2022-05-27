"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = exports.isFormStateKey = exports.createNaked$Form = exports.forEachFormField = exports.getFormFieldValues = void 0;
function getFormFieldValues(form) {
    const values = {};
    forEachFormField(form, (formField, key) => {
        values[key] = formField.value;
    });
    return values;
}
exports.getFormFieldValues = getFormFieldValues;
function forEachFormField(form, callback) {
    for (const key in form) {
        if (isFormStateKey(key))
            continue;
        callback(form[key], key);
    }
}
exports.forEachFormField = forEachFormField;
function createNaked$Form(form) {
    return Object.entries(form).reduce((prev, [key, value]) => {
        const formField = Object.assign({ errors: [], touched: false, validators: [], invalid: false }, value);
        return Object.assign(Object.assign({}, prev), { [key]: formField });
    }, {});
}
exports.createNaked$Form = createNaked$Form;
function isFormStateKey(key) {
    return key && key[0] === "$" ? true : false;
}
exports.isFormStateKey = isFormStateKey;
function dispatch(to, form) {
    to.forEach(subscriber => subscriber(form));
}
exports.dispatch = dispatch;
//# sourceMappingURL=utils.js.map