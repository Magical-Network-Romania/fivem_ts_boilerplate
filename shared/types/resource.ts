/**
 * Specifies where the resource code is running.
 * - `"client"`: Code executing on the game client.
 * - `"server"`: Code executing on the game server.
 * - `"web"`:    Code executing in a standalone web context.
 */
export type ResourceContext = "client" | "server" | "web";

/**
 * Defines the environment in which the resource is hosted.
 * - `"game"`:    In-game runtime (direct game API access).
 * - `"cef"`:     Embedded CEF browser inside the game.
 * - `"browser"`: External/standalone browser window.
 */
export type ResourceEnvironment = "game" | "cef" | "browser";
