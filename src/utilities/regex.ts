export function isLookahead(pattern: string) {
	if (pattern.length < 4) return false
	if (pattern[pattern.length - 1] !== ")") return false
	if (pattern[0] !== "(" || pattern[1] !== "?") return false
	if (pattern[2] !== "=" && pattern[2] !== "!") return false
	return true
}
