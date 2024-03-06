import styles from "./style.module.css"

export default function KeyValueBlock({ title="", children }) {
	return (
		<div className={styles.container}>
			<div className={styles.key}>{title}</div> 
			<div className={styles.value}>{children}</div>
		</div>
	);
}