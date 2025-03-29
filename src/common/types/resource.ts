import type confing from "static/config.json";

export type ResourceContext = "client" | "server" | "web";
export type ResourceEnvironment = "game" | "cef" | "browser";
export type ConfigType = typeof confing;
