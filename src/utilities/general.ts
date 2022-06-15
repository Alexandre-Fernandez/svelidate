/**
 * Shallow merge of all properties of `obj2` into `obj1`.
 * It replaces them if they already exists.
 */
export function mergeObjects(
	obj1: Record<PropertyKey, any>,
	obj2: Record<PropertyKey, any>
) {
	for (const key in obj2) {
		obj1[key] = obj2[key]
	}
}
