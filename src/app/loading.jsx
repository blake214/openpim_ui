import styles from "./style.module.css"
import { LiaSpinnerSolid } from "react-icons/lia";

export default function RootLoadingPage() {
    return (
        <div className={styles.container}>
            <div>
                <LiaSpinnerSolid size={25} className="icon_spinner" />
            </div>
        </div>
    );
}