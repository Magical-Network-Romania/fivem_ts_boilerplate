import type { FxManifest } from "../types";

export const defaultFxManifestSettings: FxManifest = {
	fx_version: "cerulean",
	game: "gta5",
	node_version: "22",
	dependencies: ["/server:13068", "/onesync"]
} as const;

export const stripOptions = {
	prefixKeyword: "strip:",
	prefixRegex: /^strip:/,
	leadingSlashOrBackslashRegex: /^[\\/]/
} as const;
