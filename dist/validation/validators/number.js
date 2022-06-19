"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../../utilities/input");
const validatorCollectionFactory_1 = require("../factories/validatorCollectionFactory");
const number = {
    gt(number) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value > number, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            numbers: () => ({ min: number + 1 }),
        }));
    },
    gte(number) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value >= number, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            numbers: () => ({ min: number }),
        }));
    },
    lt(number) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value < number, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            numbers: () => ({ max: number - 1 }),
        }));
    },
    lte(number) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value <= number, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            numbers: () => ({ max: number }),
        }));
    },
    inside(min, max) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value >= min && value <= max, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            numbers: () => ({ min, max }),
        }));
    },
    outside(min, max) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value < min && value > max);
    },
    neq(number) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value !== number);
    },
    eq(number) {
        return (0, validatorCollectionFactory_1.createNumberValidatorWrapperFactory)(value => value === number, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            numbers: () => ({ min: number, max: number }),
        }));
    },
};
exports.default = number;
//# sourceMappingURL=number.js.map