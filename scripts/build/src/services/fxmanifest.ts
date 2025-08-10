import type { FXManifest, FXManifestConfig } from "../types";

/**
 * Generates the fxmanifest.lua to the specified path.
 * The settings are obtained from the package json as well as the default fxmanifest provided.
 *
 * @param path - The path where the fxmanifest.lua will be created.
 * @param defaultSettings - All FXManifest values that should be written.
 * @param config - The config which fxmanifest will use for formatting.
 */
export async function generateFXManifest(path: string, defaultSettings: FXManifest, config: FXManifestConfig): Promise<void> {
	console.log("⏳ | Started generating the fxmanifest.");

	const pkg = JSON.parse(await Bun.file("package.json").text());

	const fxManifest: FXManifest = {
		fx_version: defaultSettings?.fx_version ?? "cerulean",
		game: defaultSettings?.game ?? "common",
		server_only: defaultSettings?.server_only,
		node_version: defaultSettings?.node_version,
		name: defaultSettings?.name ?? pkg.name,
		author: defaultSettings?.author ?? pkg.author,
		version: defaultSettings?.version ?? pkg.version,
		license: defaultSettings?.license ?? pkg.license,
		repository: defaultSettings?.repository ?? pkg.repository?.url,
		description: defaultSettings?.description ?? pkg.description,
		ui_page: defaultSettings?.ui_page,
		loadscreen: defaultSettings?.loadscreen,
		loadscreen_manual_shutdown: defaultSettings.loadscreen_manual_shutdown,
		shared_script: defaultSettings?.shared_script,
		client_script: defaultSettings?.client_script,
		server_script: defaultSettings?.server_script,
		files: defaultSettings?.files,
		dependencies: defaultSettings?.dependencies
	};

	const manifestEntries = Object.entries(fxManifest) as [keyof FXManifest, unknown][];

	const manifestLines: string[] = [];

	for (const [key, value] of manifestEntries) {
		if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) continue;

		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") manifestLines.push(`${key} '${value}'`);

		if (Array.isArray(value)) {
			manifestLines.push(`${key} {`);

			for (const item of value) manifestLines.push(`${config.indentValue}'${item}',`);

			manifestLines.push("}");
		}

		// Insert blank lines if configured
		const numberOfLines = config.blankLines[key] ?? 0;
		for (let i = 0; i < numberOfLines; i++) manifestLines.push("");
	}

	const manifestText: string = manifestLines.join("\n");
	await Bun.write(`${path}/fxmanifest.lua`, manifestText);

	console.log("✅ | Fxmanifest generated successfully.");
}
