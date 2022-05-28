"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = void 0;
const utils_1 = require("./utils");
exports.date = {
    afterThe(date) {
        return (0, utils_1.createValidator)(value => {
            const val = (0, utils_1.getDate)(value);
            if (!val)
                return false;
            return val > date;
        });
    },
    afterTheOrEqualTo(date) {
        return (0, utils_1.createValidator)(value => {
            const val = (0, utils_1.getDate)(value);
            if (!val)
                return false;
            return val >= date;
        });
    },
    beforeThe(date) {
        return (0, utils_1.createValidator)(value => {
            const val = (0, utils_1.getDate)(value);
            if (!val)
                return false;
            return val < date;
        });
    },
    beforeTheOrEqualTo(date) {
        return (0, utils_1.createValidator)(value => {
            const val = (0, utils_1.getDate)(value);
            if (!val)
                return false;
            return val <= date;
        });
    },
    inRange(min, max) {
        return (0, utils_1.createValidator)(value => {
            const date = (0, utils_1.getDate)(value);
            if (!date)
                return false;
            return min <= date && date <= max;
        });
    },
    outOfRange(min, max) {
        return (0, utils_1.createValidator)(value => {
            const date = (0, utils_1.getDate)(value);
            if (!date)
                return false;
            return date < min || date > max;
        });
    },
    differentFrom(date) {
        return (0, utils_1.createValidator)(value => {
            const val = (0, utils_1.getDate)(value);
            if (!val)
                return false;
            return val !== date;
        });
    },
    equalTo(date) {
        return (0, utils_1.createValidator)(value => {
            const val = (0, utils_1.getDate)(value);
            if (!val)
                return false;
            return val === date;
        });
    },
};
//# sourceMappingURL=date.js.map