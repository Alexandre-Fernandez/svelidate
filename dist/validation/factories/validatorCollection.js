"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIf = exports.createConditionalValidatorWrapper = void 0;
function createConditionalValidatorWrapper(condition, validator) {
    return {
        js: (value) => {
            if (condition(value))
                return validator.js(value);
            return undefined;
        },
        html: validator.html,
    };
}
exports.createConditionalValidatorWrapper = createConditionalValidatorWrapper;
function validateIf(condition, validators) {
    if (Array.isArray(validators)) {
        return validators.map(validator => createConditionalValidatorWrapper(condition, validator));
    }
    return createConditionalValidatorWrapper(condition, validators);
}
exports.validateIf = validateIf;
//# sourceMappingURL=validatorCollection.js.map