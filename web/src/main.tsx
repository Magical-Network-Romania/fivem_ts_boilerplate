import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { isEnvBrowser } from "./utils/misc";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element.");

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);

if (isEnvBrowser()) rootElement.classList.add("in-browser");
