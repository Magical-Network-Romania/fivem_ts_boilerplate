import pageIcon from "@assets/web/vite.svg";
import { type JSX, useEffect, useState } from "react";
import Counter from "./components/counter";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { isEnvBrowser } from "./utils/browser";

function App(): JSX.Element {
	const [visible, setVisible] = useState<boolean>(isEnvBrowser());

	useNuiEvent<boolean>("setVisible", (data) => {
		setVisible(data);
	});

	useEffect(() => {
		let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

		if (!link) {
			link = document.createElement("link");
			link.rel = "icon";
			document.head.appendChild(link);
		}

		link.href = pageIcon;
		link.type = "image/svg+xml";
	}, []);

	return <>{visible && <Counter />}</>;
}

export default App;
