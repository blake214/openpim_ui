import Link from "next/link";
import styles from "./style.module.css"

export default function BasicLink({ children, item, align }) {
	return (
		<Link
			href={item.path}
			className={`
				${styles.container}
				${align === "right" && styles.right}
				${align === "center" && styles.center}				
			`}
		>
			{children}
		</Link>
	);
}
