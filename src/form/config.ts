import type { PartialAll, SvelidateConfiguration } from "../types"

export const svelidateConfig: SvelidateConfiguration = {
	mode: "default",
	pattern: {
		symbol: "[!\"#\\$%&'\\(\\)\\*\\+,-\\.\\/: ;<=>\\?@\\[\\]\\^_`}{~\\|\\\\]", // !"#$%&'()*+,-./: ;<=>?@[\\]^_`{|}~
		email: "[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]+",
	},
}

export function createLocalConfig(
	localConfig: PartialAll<SvelidateConfiguration>
) {
	const config: SvelidateConfiguration = structuredClone(svelidateConfig)
	const merge = (obj1: Record<string, any>, obj2: Record<string, any>) => {
		for (const key in obj2) {
			if (obj2[key] === null) obj1[key] = obj2[key]
			else if (typeof obj2[key] === "object") {
				merge(obj1[key], obj2[key])
			} else obj1[key] = obj2[key]
		}
	}
	merge(config, localConfig)
	return config
}
