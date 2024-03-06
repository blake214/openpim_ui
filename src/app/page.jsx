import PrimarySearchBar from "@/components/primary_searchbar/primary_searchbar";
import styles from "./style.module.css"

export default function RootPage() {
    return (
        <div className={styles.container}>
            <PrimarySearchBar/>
        </div>
    );
}
