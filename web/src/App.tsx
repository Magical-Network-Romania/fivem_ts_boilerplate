import { type JSX, useState } from "react";
import Counter from "./components/counter";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { isEnvBrowser } from "./utils/browser";

function App(): JSX.Element {
	const [visible, setVisible] = useState<boolean>(isEnvBrowser());

	useNuiEvent<boolean>("setVisible", (data) => {
		setVisible(data);
	});

	return <>{visible && <Counter />}</>;
}

export default App;
