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
    title?: string;
    placeholder?: string;
    readonly?: boolean;
    step?: number | string;
    size?: number;
    autocomplete?: HtmlAutocompleteAttribute;
    spellcheck?: boolean | "true" | "false" | null | undefined;
    autocapitalize?: string | null | undefined;
    autofocus?: boolean;
};
export declare type UninitializedField<T = unknown> = {
    value: T;
    validators?: ValidatorWrapper<T>[];
    type?: HtmlInputType;
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
    type?: HtmlInputType | null;
    touched?: boolean;
    attributes?: SvelidateFieldAttributes;
    errors?: string[];
    invalid?: boolean;
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
    accept?: string;
    multiple?: boolean;
};
export declare type HtmlPseudoInputType = "select-multiple" | "select-one" | "textarea";
export declare type HtmlFileInputType = "file";
export declare type HtmlNumberInputType = "number" | "range";
export declare type HtmlDateTimeInputType = "datetime-local" | "date" | "month" | "week" | "time";
export declare type HtmlStringInputType = "text" | "tel" | "email" | "url" | "password" | "search";
export declare type HtmlInputType = HtmlDateTimeInputType | HtmlNumberInputType | HtmlStringInputType | HtmlFileInputType | "checkbox" | "color" | "hidden" | "radio" | "reset" | "submit";
export declare type SvelidateInputType = HtmlInputType | HtmlPseudoInputType;
declare type HtmlAutocompleteAttribute = "off" | "on" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "email" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo";
export declare type ByteUnit = "b" | "kb" | "mb" | "gb" | "tb";
export declare type VectorExtension = ".svg" | ".svgz";
export declare type RasterExtension = ".tiff" | ".pjp" | ".jfif" | ".bmp" | ".gif" | ".png" | ".xbm" | ".dib" | ".jxl" | ".jpeg" | ".jpg" | ".webp" | ".ico" | ".tif" | ".pjpeg" | ".avif";
export declare type VideoExtension = ".ogm" | ".wmv" | ".mpg" | ".webm" | ".ogv" | ".mov" | ".asx" | ".mpeg" | ".mp4" | ".m4v" | ".avi";
export declare type AudioExtension = ".opus" | ".flac" | ".webm" | ".weba" | ".wav" | ".ogg" | ".m4a" | ".oga" | ".mid" | ".mp3" | ".aiff" | ".wma" | ".au";
export declare type OfficeExtension = ".docx" | ".docm" | ".dotx" | ".dotm" | ".docb" | ".pdf" | ".wll" | ".wwl" | ".xlsx" | ".xlsm" | ".xltx" | ".xltm" | ".xlsb" | ".xla" | ".xlam" | ".xll" | ".xlw" | ".pptx" | ".pptm" | ".potx" | ".potm" | ".ppam" | ".ppsx" | ".ppsm" | ".sldx" | ".sldm" | ".pa" | ".adn" | ".accdb" | ".accdr" | ".accdt" | ".accda" | ".mdw" | ".accdt" | ".accde" | ".mam" | ".maq" | ".mar" | ".mat" | ".maf" | ".laccdb" | ".one" | ".ecf" | ".xps";
export declare type CompressedExtension = ".7z" | ".arj" | ".deb" | ".pkg" | ".rar" | ".rpm" | ".tar.gz" | ".z" | ".zip";
export declare type MediaExtension = ".bin" | ".dmg" | ".iso" | ".toast" | ".vcd";
export declare type DataExtension = ".csv" | ".dat" | ".db" | ".dbf" | ".log" | ".mdb" | ".sav" | ".sql" | ".tar" | ".xml" | ".json";
export declare type EmailExtension = ".email" | ".eml" | ".emlx" | ".msg" | ".oft" | ".ost" | ".pst" | ".vcf";
export declare type ExecutableExtension = ".apk" | ".bat" | ".bin" | ".cgi" | ".pl" | ".com" | ".exe" | ".gadget" | ".jar" | ".msi" | ".py" | ".wsf";
export declare type WebExtension = ".asp" | ".aspx" | ".cer" | ".cfm" | ".cgi" | ".pl" | ".css" | ".htm" | ".html" | ".js" | ".jsp" | ".part" | ".php" | ".py" | ".rss" | ".xhtml";
export declare type FontExtension = ".fnt" | ".fon" | ".otf" | ".ttf";
export declare type ImageExtension = VectorExtension | RasterExtension;
declare type StringUnion<T extends string> = T | Omit<string, T>;
export declare type FileExtension = StringUnion<ImageExtension | VideoExtension | AudioExtension | OfficeExtension | CompressedExtension | MediaExtension | DataExtension | EmailExtension | ExecutableExtension | FontExtension | WebExtension>;
export {};
