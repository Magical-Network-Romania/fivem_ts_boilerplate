import type configType from "static/config.json";
import {fetchFile} from "./utils/file";

const config  = fetchFile<typeof configType>("static/config.json");

export default config;
