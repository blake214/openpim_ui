import general_styles from "@/components/style.module.css"

export default function CustomToggle({ align_type, state, toggleState, children }) {
	return (
		<button 
			className={`
				${general_styles.container_button} 
				${state && general_styles.container_button_active}
				${align_type === "horizontal" ? (general_styles.container_button_horizontal) : (general_styles.container_button_vertical)}
				`}
			onClick={toggleState}>
				{children}
		</button>
	);
}