"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validatorCollectionFactory_1 = require("../factories/validatorCollectionFactory");
const boolean = {
    true: (0, validatorCollectionFactory_1.createBooleanValidatorWrapperFactory)(value => !!value, () => ({ required: true })),
    false: (0, validatorCollectionFactory_1.createBooleanValidatorWrapperFactory)(value => !value, () => ({})),
};
exports.default = boolean;
//# sourceMappingURL=boolean.js.map