import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { fetchNui } from "./utils/fetchNui";
import { isEnvBrowser } from "./utils/misc";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element.");

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);

if (isEnvBrowser()) {
	rootElement.classList.add("in-browser");

	const dayBackground = true;
	rootElement.style.setProperty(
		"--browserBackground",
		`url(${dayBackground ? "https://i.imgur.com/bMWrCgo.png" : "https://i.imgur.com/tu7wN1B.png"})`
	);
}

fetchNui("nuiReady");
