"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = void 0;
const utils_1 = require("./utils");
exports.date = {
    afterThe(date) {
        return (0, utils_1.createDateValidator)(value => value > date);
    },
    afterTheOrEqualTo(date) {
        return (0, utils_1.createDateValidator)(value => value >= date);
    },
    beforeThe(date) {
        return (0, utils_1.createDateValidator)(value => value < date);
    },
    beforeTheOrEqualTo(date) {
        return (0, utils_1.createDateValidator)(value => value <= date);
    },
    inRange(min, max) {
        return (0, utils_1.createDateValidator)(value => min <= value && value <= max);
    },
    outOfRange(min, max) {
        return (0, utils_1.createDateValidator)(value => value < min || value > max);
    },
    differentFrom(date) {
        return (0, utils_1.createDateValidator)(value => value !== date);
    },
    equalTo(date) {
        return (0, utils_1.createDateValidator)(value => value === date);
    },
};
//# sourceMappingURL=date.js.map