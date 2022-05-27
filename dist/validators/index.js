export const isRequired = createValidator(value => {
    if (!value && value !== 0)
        return false;
    return true;
});
export const isEmail = createValidator(value => {
    if (typeof value !== "string")
        return false;
    let email = value.toLowerCase().split("@");
    if (email.length !== 2)
        return false;
    const [localPart, domain, extension] = [email[0], ...email[1].split(".")];
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
});
export const isRegexMatched = (regex) => createValidator(value => {
    if (typeof value !== "string")
        return false;
    return regex.test(value);
});
export const isEqualTo = (value) => createValidator(val => val === value);
export const isGreaterThan = (number) => createValidator(value => {
    if (typeof value === "number")
        return value > number;
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length > number;
    }
    return false;
});
export const isGreaterThanOrEqualTo = (number) => createValidator(value => {
    if (typeof value === "number")
        return value > number;
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length > number;
    }
    return false;
});
export const isLesserThan = (number) => createValidator(value => {
    if (typeof value === "number")
        return value < number;
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length < number;
    }
    return false;
});
export const isLesserThanOrEqualTo = (number) => createValidator(value => {
    if (typeof value === "number")
        return value <= number;
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length <= number;
    }
    return false;
});
export const isInRange = (min, max) => createValidator(value => {
    if (typeof value === "number")
        return value >= min && value <= max;
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length >= min && value.length <= max;
    }
    return false;
});
export const isOutOfRange = (min, max) => createValidator(value => {
    if (typeof value === "number")
        return value < min && value > max;
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length < min && value.length > max;
    }
    return false;
});
export function createValidator(callback, defaultErrorMessage = "") {
    return (errorMessage = defaultErrorMessage) => (value) => {
        if (callback(value))
            return undefined; // no error
        return errorMessage;
    };
}
//# sourceMappingURL=index.js.map