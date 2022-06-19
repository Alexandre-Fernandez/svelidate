"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObjects = void 0;
/**
 * Shallow merge of all properties of `obj2` into `obj1`.
 * It replaces them if they already exists.
 */
function mergeObjects(obj1, obj2) {
    for (const key in obj2) {
        obj1[key] = obj2[key];
    }
}
exports.mergeObjects = mergeObjects;
//# sourceMappingURL=general.js.map