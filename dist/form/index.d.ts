import type { SvelidateForm, UninitializedForm, SvelidateFormStore, SvelidateConfiguration, PartialAll } from "../types";
export declare function svelidate<F extends UninitializedForm>(initialForm: F, config?: PartialAll<SvelidateConfiguration>): SvelidateFormStore<F, SvelidateForm<F>>;
