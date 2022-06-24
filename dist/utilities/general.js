"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBytes = exports.mergeObjects = void 0;
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
function toBytes(size, unit) {
    switch (unit) {
        case "b":
            return size;
        case "kb":
            return size * 1024;
        case "mb":
            return size * 1048576;
        case "gb":
            return size * 1073741824;
        case "tb":
            return size * 1099511627776;
    }
}
exports.toBytes = toBytes;
//# sourceMappingURL=general.js.map