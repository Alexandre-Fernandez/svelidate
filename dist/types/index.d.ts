export declare type PartialAll<T> = {
    [K in keyof T]?: T[K] extends object ? PartialAll<T[K]> : T[K];
};
export declare type SvelidateConfiguration = {
    mode: "html-only" | "js-only" | "default" | "all";
    pattern: {
        symbol: string;
        email: string;
    };
};
declare type UninitializedFieldAttributes = {
    type?: HtmlInputType;
    title?: string;
};
export declare type UninitializedField<T = unknown> = {
    value: T;
    validators?: ValidatorWrapper<T>[];
    touched?: boolean;
    attributes?: UninitializedFieldAttributes;
};
export declare type UninitializedForm = {
    [key: PropertyKey]: UninitializedField;
};
declare type SvelidateFieldAttributes = {
    name: string;
} & UninitializedFieldAttributes & HtmlValidator;
export declare type SvelidateField<T = unknown> = {
    value: T;
    validators?: ValidatorWrapper<T>[];
    errors?: string[];
    touched?: boolean;
    invalid?: boolean;
    attributes?: SvelidateFieldAttributes;
};
export declare type NakedSvelidateForm<F extends UninitializedForm> = {
    [K in keyof F]: Required<SvelidateField<F[K]["value"]>>;
} & Partial<$Meta>;
export declare type SvelidateForm<F extends UninitializedForm> = {
    [K in keyof F]: Required<SvelidateField<F[K]["value"]>>;
} & $Meta;
export declare type $Meta = $State & $Events & $Functions;
export declare type $State = {
    $st: {
        invalid: boolean;
        submitted: boolean;
        initial: Readonly<UninitializedForm>;
        form: HTMLFormElement | null;
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
export declare type SvelidateFormStore<F extends UninitializedForm, T = SvelidateForm<F>> = SvelteStore<T> & {
    set: (value: T) => void;
};
export declare type Subscriber = <F extends UninitializedForm>(form: SvelidateForm<F>) => void;
export declare type ValidatorWrapper<T = unknown, I extends SvelidateInputType = SvelidateInputType> = Readonly<{
    js: JsValidator<T>;
    html: HtmlValidatorMapper<I>;
}>;
export declare type JsValidator<T = unknown> = (value: T) => string | undefined;
export declare type JsValidatorPredicate<T = unknown> = (value: T) => boolean;
export declare type HtmlValidatorMapper<T extends SvelidateInputType = SvelidateInputType> = (inputType?: T) => HtmlValidator;
export declare type HtmlValidator = {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number | string;
    max?: number | string;
};
export declare type HtmlPseudoInputType = "select-multiple" | "select-one" | "textarea";
export declare type HtmlNumberInput = "number" | "range";
export declare type HtmlDateTimeInputType = "datetime-local" | "date" | "month" | "week" | "time";
export declare type HtmlStringInput = "text" | "tel" | "email" | "url" | "password" | "search";
export declare type HtmlInputType = HtmlDateTimeInputType | HtmlNumberInput | HtmlStringInput | "checkbox" | "color" | "file" | "hidden" | "radio" | "reset" | "submit";
export declare type SvelidateInputType = HtmlInputType | HtmlPseudoInputType;
export {};
