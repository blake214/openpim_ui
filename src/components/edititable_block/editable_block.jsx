import styles from "./style.module.css"
import { FaEdit } from "react-icons/fa";

export default function EditableBlock({ title="", onClick=null, children }) {
	return (
		<>
			<div className={styles.title_container}>
				<b>{title}</b>
				{onClick && 
					<div className="align_right">
						<button onClick={onClick}><FaEdit size={20} cursor="pointer"/></button>
					</div>
				}
			</div>
			<div className={styles.body_container}>
				{children}
			</div>
		</>
	);
}