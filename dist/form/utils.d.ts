import { $Form, Form, FormField, Naked$Form, Subscriber } from "../types";
export declare function getFormFieldValues<F extends Form>(form: $Form<F>): Record<PropertyKey, unknown>;
export declare function forEachFormField<F extends Form>(form: $Form<F>, callback: (formField: Required<FormField>, key: string) => void): void;
export declare function createNaked$Form<F extends Form>(form: F): Naked$Form<F>;
export declare function isFormStateKey(key: string): boolean;
export declare function dispatch<F extends Form>(to: Subscriber[], form: $Form<F>): void;
