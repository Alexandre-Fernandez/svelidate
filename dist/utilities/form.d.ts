import type { SvelidateForm, UninitializedForm, Subscriber, SvelidateField } from "../types";
export declare function getFormFieldValues<F extends UninitializedForm>(form: SvelidateForm<F>): Record<PropertyKey, unknown>;
export declare function forEachFormField<F extends UninitializedForm>(form: SvelidateForm<F>, callback: (formField: Required<SvelidateField>, key: string) => void): void;
export declare function isFormStateKey(key: string): boolean;
export declare function getParentForm(input: HTMLInputElement): HTMLFormElement | null;
export declare function storeDispatch<F extends UninitializedForm>(to: Subscriber[], form: SvelidateForm<F>): void;
