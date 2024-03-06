import general_styles from "@/components/style.module.css"

export default function CustomToggle({ align, state, toggleState, children }) {
	return (
		<button 
			className={`
				${general_styles.container_button} 
				${state && general_styles.container_button_active}
				${align === "horizontal" ? (general_styles.container_button_horizontal) : (general_styles.container_button_vertical)}
				`}
			onClick={toggleState}>
				{children}
		</button>
	);
}