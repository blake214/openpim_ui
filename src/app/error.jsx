"use client"

import styles from "./style.module.css"

export default function RootErrorPage() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.center_text}>Error</h1>
                <p className={styles.center_text}>Something went wrong...</p>
            </div>
        </div>
    );
}