"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
const utils_1 = require("./utils");
const NUMBERS = Object.freeze("0123456789".split(""));
const SYMBOLS = Object.freeze(" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split(""));
exports.string = {
    isEmail: (0, utils_1.createValidator)(value => {
        if (typeof value !== "string")
            return false;
        let email = value.toLowerCase().split("@");
        if (email.length !== 2)
            return false;
        const [localPart, domain, extension] = [
            email[0],
            ...email[1].split("."),
        ];
        if (!localPart || !domain || !extension)
            return false;
        if (localPart.length > 64 || domain.length > 63)
            return false;
        let allowedChars = "abcdefghijklmnopqrstuvwxyz".split("");
        if (!allowedChars.includes(localPart[0]))
            return false;
        if (!allowedChars.includes(domain[0]))
            return false;
        if (localPart[localPart.length - 1] === ".")
            return false;
        if (domain[domain.length - 1] === "-")
            return false;
        if (domain.length > 3 && domain[2] === "-" && domain[3] === "-") {
            return false;
        }
        for (const char of extension) {
            if (!allowedChars.includes(char))
                return false;
        }
        allowedChars = [...allowedChars, ..."0123456789-"];
        for (const char of domain) {
            if (!allowedChars.includes(char))
                return false;
        }
        allowedChars = [...allowedChars, ..."_."];
        for (let i = 0; i < localPart.length; i++) {
            const char = localPart[i];
            const nextChar = localPart[i + 1];
            if (!allowedChars.includes(char))
                return false;
            if (char === "." && nextChar && nextChar === ".")
                return false;
        }
        return true;
    }),
    hasUpperCaseLetter: (0, utils_1.createValidator)(value => {
        if (typeof value !== "string")
            return false;
        return value.toLowerCase() !== value;
    }),
    hasLowerCaseLetter: (0, utils_1.createValidator)(value => {
        if (typeof value !== "string")
            return false;
        return value.toUpperCase() !== value;
    }),
    hasNumber: (0, utils_1.createValidator)(value => {
        if (typeof value !== "string")
            return false;
        for (const char of value) {
            if (NUMBERS.includes(char))
                return true;
        }
        return false;
    }),
    hasSymbol(symbols = SYMBOLS) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            for (const char of value) {
                if (symbols.includes(char))
                    return true;
            }
            return false;
        });
    },
    matchesRegex(regex) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return regex.test(value);
        });
    },
    longerThan(length) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length > length;
        });
    },
    longerThanOrEqualTo(length) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length >= length;
        });
    },
    shorterThan(length) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length < length;
        });
    },
    shorterThanOrEqualTo(length) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length <= length;
        });
    },
    lengthInRange(min, max) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length >= min && value.length <= max;
        });
    },
    lengthOutOfRange(min, max) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length < min && value.length > max;
        });
    },
    lengthDifferentFrom(length) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length !== length;
        });
    },
    lengthEqualTo(length) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value.length === length;
        });
    },
    equalTo(string) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value === string;
        });
    },
    differentFrom(string) {
        return (0, utils_1.createValidator)(value => {
            if (typeof value !== "string")
                return false;
            return value !== string;
        });
    },
};
//# sourceMappingURL=string.js.map