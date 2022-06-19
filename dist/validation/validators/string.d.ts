declare const string: {
    email: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    upperCase: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    lowerCase: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    number: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    symbol: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    regex(regex: RegExp): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    eq(string: string): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    neq(string: string): (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    length: {
        gt(length: number): (error?: string) => Readonly<{
            js: import("../..").JsValidator<unknown>;
            html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        gte(length: number): (error?: string) => Readonly<{
            js: import("../..").JsValidator<unknown>;
            html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        lt(length: number): (error?: string) => Readonly<{
            js: import("../..").JsValidator<unknown>;
            html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        lte(length: number): (error?: string) => Readonly<{
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
        neq(length: number): (error?: string) => Readonly<{
            js: import("../..").JsValidator<unknown>;
            html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        eq(length: number): (error?: string) => Readonly<{
            js: import("../..").JsValidator<unknown>;
            html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
    };
};
export default string;
