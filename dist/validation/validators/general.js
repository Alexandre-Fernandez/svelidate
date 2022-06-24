"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../../utilities/date");
const input_1 = require("../../utilities/input");
const validatorCollectionFactory_1 = require("../factories/validatorCollectionFactory");
const general = {
    truthy: (0, validatorCollectionFactory_1.createValidatorWrapperFactory)(value => !!value, () => ({})),
    falsy: (0, validatorCollectionFactory_1.createValidatorWrapperFactory)(value => !value, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
        textarea: () => ({ minLength: 0, maxLength: 0 }),
        strings: () => ({ pattern: "(?=^$)" }),
        numbers: () => ({ min: 0, max: 0 }),
        dates: dateInput => {
            const now = new Date();
            const dates = {
                afterNow: (0, date_1.getExcludedDate)(now, dateInput, "+"),
                beforeNow: (0, date_1.getExcludedDate)(now, dateInput, "-"),
            };
            if (!dates.afterNow || !dates.beforeNow)
                return {};
            return {
                min: (0, date_1.getFormattedDate)(dates.afterNow, dateInput),
                max: (0, date_1.getFormattedDate)(dates.beforeNow, dateInput),
            };
        },
    })),
    required: (0, validatorCollectionFactory_1.createValidatorWrapperFactory)(value => {
        if (!value && value !== 0)
            return false;
        return true;
    }, () => ({
        required: true,
    })),
    eq(value) {
        const parsedString = String(value);
        const parsedFloat = isNaN(parseFloat(parsedString))
            ? undefined
            : parseFloat(parsedString);
        return (0, validatorCollectionFactory_1.createValidatorWrapperFactory)(val => val === value, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            strings: () => ({ pattern: `(?=^${parsedString}$)` }),
            numbers: () => ({
                min: parsedFloat,
                max: parsedFloat,
            }),
            dates: dateInput => {
                const date = (0, date_1.getDate)(value);
                if (!date)
                    return {};
                return {
                    min: (0, date_1.getFormattedDate)(date, dateInput),
                    max: (0, date_1.getFormattedDate)(date, dateInput),
                };
            },
        }));
    },
    neq(value) {
        return (0, validatorCollectionFactory_1.createValidatorWrapperFactory)(val => val !== value, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            strings: () => ({ pattern: `(?!${value}$)` }),
        }));
    },
};
exports.default = general;
//# sourceMappingURL=general.js.map