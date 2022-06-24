import type { HtmlDateTimeInputType, SvelidateInputType, HtmlNumberInputType, HtmlStringInputType, HtmlPseudoInputType, HtmlValidatorMapper, HtmlValidator, HtmlFileInputType, HtmlCheckboxInputType } from "../types";
declare type MapperMapFunction<T extends HtmlValidatorMapper<any>> = (inputType: NonNullable<Parameters<T>[0]>) => ReturnType<T>;
declare type HtmlValidatorMapperMap = {
    textarea: MapperMapFunction<HtmlValidatorMapper<Extract<HtmlPseudoInputType, "textarea">>>;
    file: MapperMapFunction<HtmlValidatorMapper<HtmlFileInputType>>;
    checkbox: MapperMapFunction<HtmlValidatorMapper<HtmlCheckboxInputType>>;
    numbers: MapperMapFunction<HtmlValidatorMapper<HtmlNumberInputType>>;
    dates: MapperMapFunction<HtmlValidatorMapper<HtmlDateTimeInputType>>;
    strings: MapperMapFunction<HtmlValidatorMapper<HtmlStringInputType>>;
};
export declare function getMatchingHtmlValidator(inputType: SvelidateInputType | undefined, htmlValidatorMapperMap: Partial<HtmlValidatorMapperMap>): HtmlValidator;
export declare function isNumberInput(inputType: SvelidateInputType): boolean;
export declare function isDateInput(inputType: SvelidateInputType): boolean;
export declare function isStringInput(inputType: SvelidateInputType): boolean;
export declare function isTextareaInput(inputType: SvelidateInputType): boolean;
export {};
