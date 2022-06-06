import { Validator } from "@svelidate/validation";
export declare type FormField<T = unknown> = {
    value: T;
    validators?: Validator<T>[];
    errors?: string[];
    touched?: boolean;
    invalid?: boolean;
};
export declare type Form = {
    [key: PropertyKey]: FormField;
};
export declare type Naked$Form<F extends Form> = {
    [K in keyof F]: Required<FormField<F[K]["value"]>>;
} & Partial<$Meta>;
export declare type $Form<F extends Form> = {
    [K in keyof F]: Required<FormField<F[K]["value"]>>;
} & $Meta;
export declare type $Meta = $State & $Events & $Functions;
export declare type $State = {
    $st: {
        invalid: boolean;
        submitted: boolean;
        initial: Readonly<Form>;
    };
};
export declare type $Events = {
    $on: {
        submit: (e?: SubmitEvent) => void;
        touch: (key: string) => void;
    };
};
export declare type $Functions = {
    $fn: {
        submit: (e?: SubmitEvent) => void;
        reset: () => void;
        untouch: () => void;
        getErrors: () => string[];
    };
};
declare type SvelteStore<T> = {
    subscribe: (run: (value: T) => any, invalidate?: any) => any;
};
export declare type Svelidate$Form<F extends Form, T = $Form<F>> = SvelteStore<T> & {
    set: (value: T) => void;
};
export declare type Subscriber = <F extends Form>(form: $Form<F>) => void;
export {};
