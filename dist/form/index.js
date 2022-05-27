import { createNaked$Form, dispatch, forEachFormField, getFormFieldValues, } from "./utils";
export function svelidate(initialForm) {
    const subscribers = [];
    const $form = Object.assign(Object.assign({}, createNaked$Form(initialForm)), { $st: {
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
                dispatch(subscribers, $form);
            },
            untouch: () => {
                forEachFormField($form, formField => (formField.touched = false));
                dispatch(subscribers, $form);
            },
        }, $on: { submit: (e) => { } } });
    // init
    forEachFormField($form, formField => updateFormField(formField));
    updateFormState($form);
    let lastValues = getFormFieldValues($form);
    return {
        subscribe(fn) {
            fn($form);
            subscribers.push(fn);
            return () => subscribers.splice(subscribers.indexOf(fn), 1);
        },
        set(newForm) {
            forEachFormField(newForm, (formField, key) => {
                if (lastValues[key] === undefined)
                    return;
                if (lastValues[key] !== formField.value) {
                    formField.touched = true; // outside the update function
                    // ...to be able to use it without setting touched to true
                    updateFormField(formField);
                }
            });
            updateFormState(newForm);
            dispatch(subscribers, newForm);
            lastValues = getFormFieldValues(newForm);
        },
    };
}
function updateFormState(newForm) {
    let isInvalid = false;
    forEachFormField(newForm, formField => {
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