import styles from "./style.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

export default function RowHorizontal({ children, title="", number=""}) {
	return (
		<div className={styles.container}>
			<div className={styles.check_container}><MdCheckBoxOutlineBlank /></div>
			<div className={styles.number_container}>{number}<IoMdArrowDropright /></div>
			<div className={styles.content_container}>
				<div className={styles.title_container}>{title}</div>
				<div className={styles.inner_content_container}>{children}</div>
			</div>
		</div>
	)
}