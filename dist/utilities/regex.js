"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLookahead = void 0;
function isLookahead(pattern) {
    if (pattern.length < 4)
        return false;
    if (pattern[pattern.length - 1] !== ")")
        return false;
    if (pattern[0] !== "(" || pattern[1] !== "?")
        return false;
    if (pattern[2] !== "=" && pattern[2] !== "!")
        return false;
    return true;
}
exports.isLookahead = isLookahead;
//# sourceMappingURL=regex.js.map