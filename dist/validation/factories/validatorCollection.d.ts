import type { JsValidatorPredicate, ValidatorWrapper } from "../../types";
export declare function createConditionalValidatorWrapper(condition: JsValidatorPredicate, validator: ValidatorWrapper): ValidatorWrapper;
export declare function validateIf<T extends ValidatorWrapper | ValidatorWrapper[]>(condition: JsValidatorPredicate, validators: T): T;
