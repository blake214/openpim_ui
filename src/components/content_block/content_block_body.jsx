"use client"

import styles from "./style.module.css";

export default function ContentBlockBody({children}) {
	return (
		<div className={styles.container_body}>
			{children}
		</div>
	);
}