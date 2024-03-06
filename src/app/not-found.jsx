import styles from "./style.module.css"

export default function RootNotFoundPage() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.center_text}>404</h1>
                <p className={styles.center_text}>Page not found</p>
            </div>
        </div>
    );
}