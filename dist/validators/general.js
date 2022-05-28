"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general = void 0;
const utils_1 = require("./utils");
exports.general = {
    truthy: (0, utils_1.createValidator)(value => !!value),
    falsy: (0, utils_1.createValidator)(value => !value),
    required: (0, utils_1.createValidator)(value => {
        if (!value && value !== 0)
            return false;
        return true;
    }),
    equalTo(value) {
        return (0, utils_1.createValidator)(val => val === value);
    },
    differentFrom(value) {
        return (0, utils_1.createValidator)(val => val !== value);
    },
};
//# sourceMappingURL=general.js.map