import type { FxManifest, FxManifestConfig } from "../types";

/**
 * Generates the FxManifest.lua to the specified path.
 *
 * @param {string} path - The path where the fxmanifest.lua will be created.
 * @param {FxManifest} defaultSettings - All FxManifest values that should be written.
 * @param {FxManifestConfig} config - The config which fxmanifest will use for formatting.
 */
export async function generateFxManifest(path: string, defaultSettings: FxManifest, config: FxManifestConfig): Promise<void> {
	console.log("⏳ | Started generating the FxManifest.");

	const pkg = JSON.parse(await Bun.file("package.json").text());

	const fxManifest: FxManifest = {
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
		shared_script: defaultSettings?.shared_script,
		client_script: defaultSettings?.client_script,
		server_script: defaultSettings?.server_script,
		files: defaultSettings?.files,
		dependencies: defaultSettings?.dependencies
	};

	const manifestEntries = Object.entries(fxManifest) as [keyof FxManifest, unknown][];

	const manifestLines: string[] = [];

	for (const [key, value] of manifestEntries) {
		if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) continue;

		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") manifestLines.push(`${key} '${value}'`);

		if (Array.isArray(value)) {
			manifestLines.push(`${key} {`);

			for (const item of value) manifestLines.push(`${config.arrayIndentValue}'${item}'`);

			manifestLines.push("}");
		}

		// Insert blank lines if configured
		const numberOfLines = config.blankLines[key] ?? 0;
		for (let i = 0; i < numberOfLines; i++) manifestLines.push("");
	}

	const manifestText: string = manifestLines.join("\n");
	await Bun.write(`${path}/fxmanifest.lua`, manifestText);

	console.log("✅ | FxManifest generated successfully.");
}
