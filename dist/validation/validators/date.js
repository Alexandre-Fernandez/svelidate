"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../../utilities/date");
const input_1 = require("../../utilities/input");
const validatorCollectionFactory_1 = require("../factories/validatorCollectionFactory");
const date = {
    gt(date) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => value > date, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            dates: dateInput => {
                const excludedDate = (0, date_1.getExcludedDate)(date, dateInput, "+");
                if (!excludedDate)
                    return {};
                return {
                    min: (0, date_1.getFormattedDate)(excludedDate, dateInput),
                };
            },
        }));
    },
    gte(date) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => value >= date, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            dates: dateInput => ({
                min: (0, date_1.getFormattedDate)(date, dateInput),
            }),
        }));
    },
    lt(date) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => value < date, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            dates: dateInput => {
                const excludedDate = (0, date_1.getExcludedDate)(date, dateInput, "-");
                if (!excludedDate)
                    return {};
                return {
                    max: (0, date_1.getFormattedDate)(excludedDate, dateInput),
                };
            },
        }));
    },
    lte(date) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => value <= date, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            dates: dateInput => ({
                max: (0, date_1.getFormattedDate)(date, dateInput),
            }),
        }));
    },
    inside(min, max) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => min <= value && value <= max, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            dates: dateInput => ({
                min: (0, date_1.getFormattedDate)(min, dateInput),
                max: (0, date_1.getFormattedDate)(max, dateInput),
            }),
        }));
    },
    outside(min, max) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => value < min || value > max);
    },
    neq(date) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => value !== date);
    },
    eq(date) {
        return (0, validatorCollectionFactory_1.createDateValidatorWrapperFactory)(value => value === date, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
            dates: dateInput => ({
                min: (0, date_1.getFormattedDate)(date, dateInput),
                max: (0, date_1.getFormattedDate)(date, dateInput),
            }),
        }));
    },
};
exports.default = date;
//# sourceMappingURL=date.js.map