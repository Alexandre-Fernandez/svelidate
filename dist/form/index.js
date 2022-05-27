"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelidate = void 0;
const utils_1 = require("./utils");
function svelidate(initialForm) {
    const subscribers = [];
    const $form = Object.assign(Object.assign({}, (0, utils_1.createNaked$Form)(initialForm)), { $st: {
            invalid: true,
            submitted: false,
            initial: Object.freeze(initialForm),
        }, $fn: {
            submit: (e) => {
                e === null || e === void 0 ? void 0 : e.preventDefault();
                $form.$st.submitted = true;
                $form.$fn.untouch();
                $form.$on.submit(e);
            },
            reset: () => {
                for (const key in $form.$initial) {
                    $form[key].touched = false;
                    $form[key].value = $form.$st.initial[key].value;
                    updateFormField($form[key]);
                }
                updateFormState($form);
                (0, utils_1.dispatch)(subscribers, $form);
            },
            untouch: () => {
                (0, utils_1.forEachFormField)($form, formField => (formField.touched = false));
                (0, utils_1.dispatch)(subscribers, $form);
            },
        }, $on: { submit: (e) => { } } });
    // init
    (0, utils_1.forEachFormField)($form, formField => updateFormField(formField));
    updateFormState($form);
    let lastValues = (0, utils_1.getFormFieldValues)($form);
    return {
        subscribe(fn) {
            fn($form);
            subscribers.push(fn);
            return () => subscribers.splice(subscribers.indexOf(fn), 1);
        },
        set(newForm) {
            (0, utils_1.forEachFormField)(newForm, (formField, key) => {
                if (lastValues[key] === undefined)
                    return;
                if (lastValues[key] !== formField.value) {
                    formField.touched = true; // outside the update function
                    // ...to be able to use it without setting touched to true
                    updateFormField(formField);
                }
            });
            updateFormState(newForm);
            (0, utils_1.dispatch)(subscribers, newForm);
            lastValues = (0, utils_1.getFormFieldValues)(newForm);
        },
    };
}
exports.svelidate = svelidate;
function updateFormState(newForm) {
    let isInvalid = false;
    (0, utils_1.forEachFormField)(newForm, formField => {
        if (formField.invalid)
            isInvalid = true;
    });
    newForm.$st.invalid = isInvalid;
}
function updateFormField(formField, newValue = formField.value) {
    formField.errors = formField.validators.reduce((errors, validator) => {
        const error = validator(newValue);
        if (error !== undefined)
            errors.push(error);
        return errors;
    }, []);
    if (formField.errors.length > 0)
        formField.invalid = true;
    else
        formField.invalid = false;
}
//# sourceMappingURL=index.js.map