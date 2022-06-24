import type { ByteUnit } from "../types";
/**
 * Shallow merge of all properties of `obj2` into `obj1`.
 * It replaces them if they already exists.
 */
export declare function mergeObjects(obj1: Record<PropertyKey, any>, obj2: Record<PropertyKey, any>): void;
export declare function toBytes(size: number, unit: ByteUnit): number;
