import { $Form, Form, Svelidate$Form } from "../types";
export declare function svelidate<F extends Form>(initialForm: F): Svelidate$Form<F, $Form<F>>;
