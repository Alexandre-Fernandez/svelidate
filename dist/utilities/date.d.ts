import type { HtmlDateTimeInputType, SvelidateInputType } from "../types";
declare const addSubstract: {
    "+": (a: number, b: number) => number;
    "-": (a: number, b: number) => number;
};
/**
 * Returns `value` as a `Date` if it is one or can be parsed as one or undefined.
 */
export declare function getDate(value: unknown): Date | undefined;
/**
 * Returns a bigger or smaller date from the given one depending on the `mode` & `inputType`.
 * It will add/substract the minimum amount of time depending on the `inputType`.
 */
export declare function getExcludedDate(date: Date, inputType: SvelidateInputType, mode: keyof typeof addSubstract): Date | undefined;
/**
 * Returns a string corresponding to the correct date format for the given `inputType`.
 */
export declare function getFormattedDate(date: Date, inputType: HtmlDateTimeInputType): string;
export {};
