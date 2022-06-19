import type { ValidatorWrapper, JsValidatorPredicate, HtmlValidatorMapper } from "../../types";
export declare function createValidatorWrapperFactory(jsValidatorPredicate: JsValidatorPredicate, htmlValidator?: HtmlValidatorMapper): (error?: string) => ValidatorWrapper;
export declare function createStringValidatorWrapperFactory(jsValidatorPredicate: JsValidatorPredicate<string>, htmlValidator?: HtmlValidatorMapper): (error?: string) => ValidatorWrapper;
export declare function createNumberValidatorWrapperFactory(jsValidatorPredicate: JsValidatorPredicate<number>, htmlValidator?: HtmlValidatorMapper): (error?: string) => ValidatorWrapper;
export declare function createDateValidatorWrapperFactory(jsValidatorPredicate: JsValidatorPredicate<Date>, htmlValidator?: HtmlValidatorMapper): (error?: string) => ValidatorWrapper;
