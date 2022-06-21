import type { ByteUnit } from "../types"

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

export function toBytes(size: number, unit: ByteUnit) {
	switch (unit) {
		case "b":
			return size
		case "kb":
			return size * 1024
		case "mb":
			return size * 1048576
		case "gb":
			return size * 1073741824
		case "tb":
			return size * 1099511627776
	}
}
