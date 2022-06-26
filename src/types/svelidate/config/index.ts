export type SvelidateConfiguration = {
	mode: "html-only" | "js-only" | "default" | "all"
	pattern: {
		symbol: string
		email: string
	}
}
