declare const general: {
    truthy: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    falsy: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    required: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    eq(value: unknown): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    neq(value: any): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
};
export default general;
