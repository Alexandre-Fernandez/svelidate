declare const date: {
    required: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    gt(date: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    gte(date: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    lt(date: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    lte(date: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    inside(min: Date, max: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    outside(min: Date, max: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    neq(date: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    eq(date: Date): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
};
export default date;
