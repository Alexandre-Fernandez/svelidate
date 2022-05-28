export declare const general: {
    truthy: (errorMessage?: string) => import("..").FormFieldValidator<any>;
    falsy: (errorMessage?: string) => import("..").FormFieldValidator<any>;
    required: (errorMessage?: string) => import("..").FormFieldValidator<any>;
    equalTo(value: any): (errorMessage?: string) => import("..").FormFieldValidator<any>;
    differentFrom(value: any): (errorMessage?: string) => import("..").FormFieldValidator<any>;
};
