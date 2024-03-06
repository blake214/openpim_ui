import general_styles from "@/components/style.module.css"
import { LiaSpinnerSolid } from "react-icons/lia";
import { useFormStatus } from "react-dom";

export default function CustomButton({ children, onClick=() => {}, align="horizontal", type="button", disabled=false, busy=false }) {
	// This will happen on form submit type buttons
	const { pending } = useFormStatus()
	return (
		<button 
			onClick={onClick}
			type={type}
			disabled={(disabled || pending) && "disabled"}
			className={`
				${general_styles.container_button} 
				${(disabled || pending) && (general_styles.container_button_disabled)} 
				${align === "horizontal" ? (general_styles.container_button_horizontal) : (general_styles.container_button_vertical)}
				`}
			>
				{children} 
				{(busy || pending) && <div className="align_right" ><LiaSpinnerSolid className="icon_spinner" /></div>}
		</button>
	);
}