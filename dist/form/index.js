"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelidate = void 0;
const form_1 = require("../utilities/form");
const general_1 = require("../utilities/general");
const regex_1 = require("../utilities/regex");
const config_1 = require("./config");
let isBrowser = false;
try {
    if (window)
        isBrowser = true;
}
catch (err) { }
function svelidate(initialForm, config = config_1.svelidateConfig) {
    let localConfig = config === config_1.svelidateConfig ? config_1.svelidateConfig : (0, config_1.createLocalConfig)(config);
    const subscribers = [];
    const $form = Object.assign(Object.assign({}, createNakedSvelidateForm(initialForm)), { $st: {
            invalid: true,
            submitted: false,
            initial: Object.freeze(initialForm),
            form: null,
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
                    updateFormField($form[key], localConfig);
                }
                updateFormState($form);
                (0, form_1.storeDispatch)(subscribers, $form);
            },
            untouch: () => {
                (0, form_1.forEachFormField)($form, formField => (formField.touched = false));
                (0, form_1.storeDispatch)(subscribers, $form);
            },
            getErrors: () => {
                let errors = [];
                (0, form_1.forEachFormField)($form, formField => {
                    if (formField.errors.length > 0) {
                        errors = [...errors, ...formField.errors];
                    }
                });
                return errors;
            },
        }, $on: { submit: (e) => { }, touch: (key) => { } } });
    // init
    (0, form_1.forEachFormField)($form, formField => updateFormField(formField, localConfig));
    updateFormState($form);
    let lastValues = (0, form_1.getFormFieldValues)($form);
    return {
        subscribe(fn) {
            fn($form);
            subscribers.push(fn);
            return () => subscribers.splice(subscribers.indexOf(fn), 1);
        },
        set(newForm) {
            (0, form_1.forEachFormField)(newForm, (formField, key) => {
                if (lastValues[key] === undefined)
                    return;
                if (lastValues[key] !== formField.value) {
                    if (!formField.touched) {
                        formField.touched = true;
                        newForm.$on.touch(key);
                    }
                    updateFormField(formField, localConfig);
                }
            });
            updateFormState(newForm);
            (0, form_1.storeDispatch)(subscribers, newForm);
            lastValues = (0, form_1.getFormFieldValues)(newForm);
        },
    };
}
exports.svelidate = svelidate;
function updateFormState(newForm) {
    let isInvalid = false;
    (0, form_1.forEachFormField)(newForm, formField => {
        if (formField.invalid)
            isInvalid = true;
    });
    newForm.$st.invalid = isInvalid;
}
function updateFormField(formField, config) {
    let mode = "all";
    if (config.mode === "default") {
        if (isBrowser)
            mode = "js-only";
        else
            mode = "html-only";
    }
    else
        mode = config.mode;
    let pattern = "";
    const errors = [];
    const htmlValidator = {};
    for (const validator of formField.validators) {
        // validate js
        if (isBrowser && (mode === "all" || mode === "js-only")) {
            const error = validator.js(formField.value);
            if (error !== undefined)
                errors.push(error);
        }
        // validate html
        if (mode === "all" || mode === "html-only") {
            if (!formField.type)
                continue;
            const _a = validator.html(formField.type), { pattern: lookahead } = _a, localValidator = __rest(_a, ["pattern"]);
            if (lookahead && (0, regex_1.isLookahead)(lookahead))
                pattern += lookahead;
            (0, general_1.mergeObjects)(htmlValidator, localValidator);
        }
    }
    if (pattern)
        htmlValidator.pattern = `^${pattern}.+$`;
    // adding errors :
    formField.errors = errors;
    if (formField.errors.length > 0)
        formField.invalid = true;
    else
        formField.invalid = false;
    // adding attributes :
    (0, general_1.mergeObjects)(formField.attributes, htmlValidator);
}
function createNakedSvelidateForm(form) {
    return Object.entries(form).reduce((prev, _a) => {
        var [name, _b] = _a, { attributes } = _b, otherProps = __rest(_b, ["attributes"]);
        const formField = Object.assign({ errors: [], touched: false, validators: [], invalid: false, type: null, attributes: Object.assign({ name }, attributes) }, otherProps);
        return Object.assign(Object.assign({}, prev), { [name]: formField });
    }, {});
}
//# sourceMappingURL=index.js.map