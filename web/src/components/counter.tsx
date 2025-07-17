import { useState } from "react";
import { getLocale } from "~/localization";
import styles from "./counter.module.css";

function Counter() {
	const [count, setCount] = useState<number>(0);

	return (
		<div>
			<h3 className={styles.title}>Boilerplate Counter, {getLocale("hello")}</h3>
			<p className={styles.text}>Count: {count}</p>

			<div className={styles.buttons}>
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
