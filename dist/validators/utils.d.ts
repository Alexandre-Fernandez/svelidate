import { FormFieldValidator } from "../types";
export declare function getDate(value: unknown): Date;
export declare function createValidator(callback: (value: unknown) => boolean, defaultErrorMessage?: string): (errorMessage?: string) => FormFieldValidator;
export declare function createStringValidator(callback: (value: string) => boolean, defaultErrorMessage?: string): (errorMessage?: string) => FormFieldValidator;
export declare function createNumberValidator(callback: (value: number) => boolean, defaultErrorMessage?: string): (errorMessage?: string) => FormFieldValidator;
export declare function createDateValidator(callback: (value: Date) => boolean, defaultErrorMessage?: string): (errorMessage?: string) => FormFieldValidator;
