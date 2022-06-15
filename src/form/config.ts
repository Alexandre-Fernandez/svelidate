type SvelidateConfiguration = {
	mode: "html" | "js" | "available" | "all"
	pattern: {
		symbol: string
		email: string
	}
}

export const svelidateConfig: SvelidateConfiguration = {
	mode: "available",
	pattern: {
		symbol: "[!\"#\\$%&'\\(\\)\\*\\+,-\\.\\/: ;<=>\\?@\\[\\]\\^_`}{~\\|\\\\]", // !"#$%&'()*+,-./: ;<=>?@[\\]^_`{|}~
		email: "[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z]+",
	},
}
