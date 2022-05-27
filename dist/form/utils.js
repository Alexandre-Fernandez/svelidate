export function getFormFieldValues(form) {
    const values = {};
    forEachFormField(form, (formField, key) => {
        values[key] = formField.value;
    });
    return values;
}
export function forEachFormField(form, callback) {
    for (const key in form) {
        if (isFormStateKey(key))
            continue;
        callback(form[key], key);
    }
}
export function createNaked$Form(form) {
    return Object.entries(form).reduce((prev, [key, value]) => {
        const formField = Object.assign({ errors: [], touched: false, validators: [], invalid: false }, value);
        return Object.assign(Object.assign({}, prev), { [key]: formField });
    }, {});
}
export function isFormStateKey(key) {
    return key && key[0] === "$" ? true : false;
}
export function dispatch(to, form) {
    to.forEach(subscriber => subscriber(form));
}
//# sourceMappingURL=utils.js.map