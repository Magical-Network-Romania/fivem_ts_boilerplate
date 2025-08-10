import process from "node:process";
import { buildConfig } from "./data/buildConfig";
import { defaultFxmanifest, fxmanifestConfig } from "./data/fxmanifest";
import { buildResource } from "./src";

const devMode = process.env.NODE_ENV === "development";

await buildResource(devMode, buildConfig, defaultFxmanifest, fxmanifestConfig);
