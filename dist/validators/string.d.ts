export declare const string: {
    isEmail: (errorMessage?: string) => import("..").FormFieldValidator<any>;
    hasUpperCaseLetter: (errorMessage?: string) => import("..").FormFieldValidator<any>;
    hasLowerCaseLetter: (errorMessage?: string) => import("..").FormFieldValidator<any>;
    hasNumber: (errorMessage?: string) => import("..").FormFieldValidator<any>;
    hasSymbol(symbols?: readonly string[]): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    matchesRegex(regex: RegExp): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    longerThan(length: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    longerThanOrEqualTo(length: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    shorterThan(length: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    shorterThanOrEqualTo(length: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    lengthInRange(min: number, max: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    lengthOutOfRange(min: number, max: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    lengthDifferentFrom(length: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    lengthEqualTo(length: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    equalTo(string: string): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    differentFrom(string: string): (errorMessage?: string) => import("..").FormFieldValidator<any>;
};
