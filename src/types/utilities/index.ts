export type PartialAll<T> = {
	[K in keyof T]?: T[K] extends object ? PartialAll<T[K]> : T[K]
}

export type StringUnion<T extends string> = T | Omit<string, T>
