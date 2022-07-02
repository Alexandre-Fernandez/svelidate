import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { resolve } from "path"

console.log(resolve(__dirname, "src/index.ts"))

export default defineConfig({
	resolve: {
		alias: {
			$src: resolve(__dirname, "src"),
			$tests: resolve(__dirname, "tests"),
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "svelidate",
			fileName: "svelidate",
			formats: ["es"],
		},
	},
	plugins: [dts()],
})
