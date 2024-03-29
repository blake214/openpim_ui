import general_styles from "@/components/style.module.css"
import { LiaSpinnerSolid } from "react-icons/lia";
import { useFormStatus } from "react-dom";

export default function CustomButton({ children, onClick=null, onMouseDown=null, onMouseUp=null, onMouseLeave=null, state=false, align="left", component_type="horizontal", type="button", disabled=false, busy=false }) {
    // ======= General
	// This will happen on form submit type buttons
	const { pending } = useFormStatus()
    // ======= General

	return (
		<button 
			onClick={onClick ? onClick : ()=>{}}
			onMouseDown={onMouseDown ? onMouseDown : ()=>{}}
			onMouseUp={onMouseUp ? onMouseUp : ()=>{}}
			onMouseLeave={onMouseLeave ? onMouseLeave : ()=>{}}
			type={type}
			disabled={(disabled || pending) && "disabled"}
			className={`
				${general_styles.container_button}
				${(disabled || pending) && (general_styles.container_button_disabled)}
				${state && general_styles.container_button_active}
				${component_type === "horizontal" && general_styles.container_button_horizontal}
				${component_type === "vertical" && general_styles.container_button_vertical}
				`}
			>
				<div className={`
					${align === "left" && "align_left"}
					${align === "right" && "align_right"}
					${align === "center" && "align_center"}
				`}>
					{children}
				</div>
				{(busy || pending) && <div className="align_right" ><LiaSpinnerSolid className="icon_spinner" /></div>}
		</button>
	);
}