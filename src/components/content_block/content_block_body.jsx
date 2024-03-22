import styles from "../style.module.css";

export default function ContentBlockBody({children}) {
	return (
		<div className={styles.container_block_body}>
			{children}
		</div>
	);
}