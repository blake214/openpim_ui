"use client";
import styles from "./custom_toggle.module.css";

export default function CustomToggle({ state, toggleState, children }) {
	return (
		<button 
			className={`${styles.container} ${
				state && styles.active
			}`}
			onClick={toggleState}>
				{children}
		</button>
	);
}