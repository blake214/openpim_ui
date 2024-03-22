import styles from "./style.module.css";
import { IoIosEye } from "react-icons/io";

export default function ImageDarkmodeWrapper({children}) {
	return (
		<div className={styles.container_dark_wrapper}>
			<div className={styles.container_dark_wrapper_content}>
                {children}
			</div>
			<div className={styles.eye_saver}><IoIosEye size={50}/></div>
		</div>
	)
}