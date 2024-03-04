import general_styles from "@/components/style.module.css"

export default function CustomButton({ align_type, click_event, type, children }) {
	return (
		<button 
			onClick={click_event}
			type={type || "button"}
			className={`
				${general_styles.container_button} 
				${align_type === "horizontal" ? (general_styles.container_button_horizontal) : (general_styles.container_button_vertical)}
				`}
			>
				{children}
		</button>
	);
}