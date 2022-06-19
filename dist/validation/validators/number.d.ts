declare const number: {
    gt(number: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    gte(number: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    lt(number: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    lte(number: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    inside(min: number, max: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    outside(min: number, max: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    neq(number: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    eq(number: number): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
};
export default number;
