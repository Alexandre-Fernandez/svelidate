import type { HtmlDateTimeInputType, SvelidateInputType, HtmlNumberInput, HtmlStringInput, HtmlPseudoInputType, HtmlValidatorMapper, HtmlValidator } from "../types";
declare type MapperMapFunction<T extends HtmlValidatorMapper<any>> = (inputType: NonNullable<Parameters<T>[0]>) => ReturnType<T>;
declare type HtmlValidatorMapperMap = {
    textarea: MapperMapFunction<HtmlValidatorMapper<Extract<HtmlPseudoInputType, "textarea">>>;
    numbers: MapperMapFunction<HtmlValidatorMapper<HtmlNumberInput>>;
    dates: MapperMapFunction<HtmlValidatorMapper<HtmlDateTimeInputType>>;
    strings: MapperMapFunction<HtmlValidatorMapper<HtmlStringInput>>;
};
export declare function getMatchingHtmlValidator(inputType: SvelidateInputType | undefined, htmlValidatorMapperMap: Partial<HtmlValidatorMapperMap>): HtmlValidator;
export declare function isNumberInput(inputType: SvelidateInputType): boolean;
export declare function isDateInput(inputType: SvelidateInputType): boolean;
export declare function isStringInput(inputType: SvelidateInputType): boolean;
export declare function isTextareaInput(inputType: SvelidateInputType): boolean;
export {};
