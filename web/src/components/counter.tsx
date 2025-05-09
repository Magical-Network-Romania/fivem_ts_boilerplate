import { useState } from "react";
import "./counter.css";

function Counter() {
	const [count, setCount] = useState<number>(0);

	return (
		<div className="boilerplate-counter">
			<h3>Boilerplate Counter</h3>
			<p>Count: {count}</p>

			<div className="counter-buttons">
				<button type="button" onClick={() => setCount((prev) => ++prev)}>
					Increment
				</button>
				<button type="button" onClick={() => setCount((prev) => --prev)}>
					Decrement
				</button>
			</div>
		</div>
	);
}

export default Counter;
