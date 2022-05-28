export declare const date: {
    afterThe(date: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    afterTheOrEqualTo(date: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    beforeThe(date: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    beforeTheOrEqualTo(date: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    inRange(min: Date, max: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    outOfRange(min: Date, max: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    differentFrom(date: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    equalTo(date: Date): (errorMessage?: string) => import("..").FormFieldValidator<any>;
};
