import PrimarySearchBar from "@/components/primary_searchbar/primary_searchbar";
import styles from "./style.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <PrimarySearchBar/>
        </div>
    );
}
