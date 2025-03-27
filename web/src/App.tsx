import { useState } from "react";
import Counter from "./components/counter";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { isEnvBrowser } from "./utils/misc";

function App() {
	const [visible, setVisible] = useState<boolean>(isEnvBrowser());

	useNuiEvent<{ visible?: boolean }>("setVisible", (data) => {
		setVisible(data.visible || false);
	});

	return visible && <Counter />;
}

export default App;
