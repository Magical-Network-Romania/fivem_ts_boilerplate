import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	resolve: {
		alias: {
			"@common": path.resolve(__dirname, "../src/common"),
		},
	},
	build: {
		outDir: "../dist/web",
		emptyOutDir: true,
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/[name].js",
			},
		},
	},
});
