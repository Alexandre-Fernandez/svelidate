"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../form/config");
const input_1 = require("../../utilities/input");
const validatorCollectionFactory_1 = require("../factories/validatorCollectionFactory");
const string = {
    email: (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => new RegExp(config_1.svelidateConfig.pattern.email).test(value), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
        strings: () => ({
            pattern: `(?=^${config_1.svelidateConfig.pattern.email}$)`,
            minLength: 5,
        }),
        textarea: () => ({
            minLength: 5,
        }),
    })),
    upperCase: (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.toLowerCase() !== value, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
        strings: () => ({
            pattern: "(?=.*[A-Z])",
        }),
    })),
    lowerCase: (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.toUpperCase() !== value, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
        strings: () => ({
            pattern: "(?=.*[a-z])",
        }),
    })),
    number: (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => new RegExp("[0-9]").test(value), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
        strings: () => ({
            pattern: "(?=.*[0-9])",
        }),
    })),
    symbol: (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => new RegExp(config_1.svelidateConfig.pattern.symbol).test(value), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
        strings: () => ({
            pattern: `(?=.*${config_1.svelidateConfig.pattern.symbol})`,
        }),
    })),
    regex(regex) {
        return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => regex.test(value), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            strings: () => ({
                pattern: `(?=.*${regex.source})`,
            }),
        }));
    },
    eq(string) {
        return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value === string, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            strings: () => ({
                pattern: `(?=^${string}$)`,
            }),
        }));
    },
    neq(string) {
        return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value !== string, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            strings: () => ({
                pattern: `(?!${string}$)`,
            }),
        }));
    },
    length: {
        gt(length) {
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length > length, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    minLength: Math.floor(length) + 1,
                }),
                textarea: () => ({
                    minLength: Math.floor(length) + 1,
                }),
            }));
        },
        gte(length) {
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length >= length, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    minLength: Math.floor(length),
                }),
                textarea: () => ({
                    minLength: Math.floor(length),
                }),
            }));
        },
        lt(length) {
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length < length, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    maxLength: Math.floor(length) - 1,
                }),
                textarea: () => ({
                    maxLength: Math.floor(length) - 1,
                }),
            }));
        },
        lte(length) {
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length <= length, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    maxLength: Math.floor(length),
                }),
                textarea: () => ({
                    maxLength: Math.floor(length),
                }),
            }));
        },
        inside(min, max) {
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length >= min && value.length <= max, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    minLength: Math.floor(min),
                    maxLength: Math.floor(max),
                }),
                textarea: () => ({
                    minLength: Math.floor(min),
                    maxLength: Math.floor(max),
                }),
            }));
        },
        outside(min, max) {
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length < min && value.length > max, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    pattern: `(?=(.{0,${Math.floor(Math.max(0, min - 1))}}|.{${Math.floor(max + 1)},})$)`,
                }),
            }));
        },
        neq(length) {
            const min = Math.max(Math.floor(length) - 1, 0);
            const max = Math.floor(length) + 1;
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length !== length, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    pattern: `(?=(.{0,${Math.floor(min)}}|.{${Math.floor(max)},})$)`,
                }),
            }));
        },
        eq(length) {
            return (0, validatorCollectionFactory_1.createStringValidatorWrapperFactory)(value => value.length === length, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                strings: () => ({
                    minLength: Math.floor(length),
                    maxLength: Math.floor(length),
                }),
                textarea: () => ({
                    minLength: Math.floor(length),
                    maxLength: Math.floor(length),
                }),
            }));
        },
    },
};
exports.default = string;
//# sourceMappingURL=string.js.map