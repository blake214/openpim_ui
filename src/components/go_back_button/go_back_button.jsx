import styles from "./style.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";

export default function GoBackButton({ target, click_event }) {
	return (
		<button 
			onClick={click_event}
			type="button"
			className={styles.container_button}
			>
				<div className="align_right"><IoMdArrowRoundBack/> Back to {target}</div>
		</button>
	);
}