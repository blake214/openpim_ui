import styles from "../style.module.css";

export default function RowVerticalContent({ title="", children }) {
	return (
		<div className={styles.container_row_content}>
            <p>{title}<span className={styles.title_right_colon}>:</span></p>
            <div>
                {children}
            </div>
        </div>
	)
}