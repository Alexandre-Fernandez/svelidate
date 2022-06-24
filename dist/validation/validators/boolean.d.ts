declare const boolean: {
    true: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    false: (error?: string) => Readonly<{
        js: import("../..").JsValidator<unknown>;
        html: import("../..").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
};
export default boolean;
