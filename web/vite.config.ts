import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "../assets"),
			"@shared": path.resolve(__dirname, "../shared"),
			"~": path.resolve(__dirname, "src")
		}
	},
	publicDir: "../",
	build: {
		target: ["es2022"],
		copyPublicDir: false,
		emptyOutDir: true,
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/[name].js"
			}
		}
	}
});
