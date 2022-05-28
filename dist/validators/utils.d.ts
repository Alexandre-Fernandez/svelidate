import { FormFieldValidator } from "../types";
export declare function createValidator(callback: (value: unknown) => boolean, defaultErrorMessage?: string): (errorMessage?: string) => FormFieldValidator;
export declare function getDate(value: unknown): Date;
