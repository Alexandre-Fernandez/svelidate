"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeDispatch = exports.getParentForm = exports.isFormStateKey = exports.forEachFormField = exports.getFormFieldValues = void 0;
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
function isFormStateKey(key) {
    return key && key[0] === "$" ? true : false;
}
exports.isFormStateKey = isFormStateKey;
function getParentForm(input) {
    let current = input;
    while (current !== null) {
        if (current.tagName === "FORM") {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
exports.getParentForm = getParentForm;
function storeDispatch(to, form) {
    to.forEach(subscriber => subscriber(form));
}
exports.storeDispatch = storeDispatch;
//# sourceMappingURL=form.js.map