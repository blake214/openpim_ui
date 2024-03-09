import styles from "../style.module.css";

export default function RowHorizontalContentContent({ children }) {
	return (
		<div className={styles.container_row_content_content}>
            <span>&#8226;</span>
            {children}
        </div>
	)
}