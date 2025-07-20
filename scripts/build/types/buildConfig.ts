export interface ContextConfig {
	outDirectory: string;
}

export interface GameConfig extends ContextConfig {
	entryFile: string;
}

export interface WebConfig extends ContextConfig {
	entryDirectory: string;
}

export interface BuildConfig {
	outDirectory: string;
	client?: GameConfig;
	server?: GameConfig;
	web?: WebConfig;
	staticDataDirectory?: string;
}
