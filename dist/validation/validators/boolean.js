"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../../utilities/input");
const validatorCollectionFactory_1 = require("../factories/validatorCollectionFactory");
const boolean = {
    true: (0, validatorCollectionFactory_1.createBooleanValidatorWrapperFactory)(value => value, inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
        checkbox: () => ({
            required: true,
        }),
    })),
    false: (0, validatorCollectionFactory_1.createBooleanValidatorWrapperFactory)(value => !value, () => ({})),
};
exports.default = boolean;
//# sourceMappingURL=boolean.js.map