export declare const number: {
    greaterThan(number: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    greaterThanorEqualTo(number: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    lesserThan(number: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    lesserThanOrEqualTo(number: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    inInterval(min: number, max: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    outOfInterval(min: number, max: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    differentFrom(number: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    equalTo(number: number): (errorMessage?: string) => import("..").FormFieldValidator<any>;
};
