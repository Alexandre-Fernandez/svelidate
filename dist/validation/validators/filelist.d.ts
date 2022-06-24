import type { ByteUnit, FileExtension } from "../../types";
declare const filelist: {
    required: (error?: string) => Readonly<{
        js: import("../../types").JsValidator<unknown>;
        html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
    }>;
    files: {
        type: {
            image: (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            raster: (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            vector: (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            video: (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            audio: (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            is: (allowedExtensions: FileExtension[]) => (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
        };
        size: {
            gt(size: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            gte(size: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            lt(size: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            lte(size: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            inside(min: number, max: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            outside(min: number, max: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            neq(size: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
            eq(size: number, unit?: ByteUnit): (error?: string) => Readonly<{
                js: import("../../types").JsValidator<unknown>;
                html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
            }>;
        };
    };
    length: {
        gt(length: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        gte(length: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        lt(length: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        lte(length: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        inside(min: number, max: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        outside(min: number, max: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        neq(length: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
        eq(length: number): (error?: string) => Readonly<{
            js: import("../../types").JsValidator<unknown>;
            html: import("../../types").HtmlValidatorMapper<import("../../types").SvelidateInputType>;
        }>;
    };
};
export default filelist;
