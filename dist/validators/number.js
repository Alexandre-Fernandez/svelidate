"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = void 0;
const utils_1 = require("./utils");
exports.number = {
    greaterThan(number) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value > number;
        });
    },
    greaterThanorEqualTo(number) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value >= number;
        });
    },
    lesserThan(number) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value < number;
        });
    },
    lesserThanOrEqualTo(number) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value <= number;
        });
    },
    inInterval(min, max) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value >= min && value <= max;
        });
    },
    outOfInterval(min, max) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value < min && value > max;
        });
    },
    differentFrom(number) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value !== number;
        });
    },
    equalTo(number) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "number")
                return false;
            return value === number;
        });
    },
};
//# sourceMappingURL=number.js.map