import Link from "next/link";
import styles from "./style.module.css"

function CustomLink({ children, href="", align="left" }) {
	return (
		<Link
			href={href}
			className={styles.container}
		>
			<div className={`
				${align === "left" && "align_left"}
				${align === "right" && "align_right"}
				${align === "center" && "align_center"}
			`}>{children}</div>
		</Link>
	);
}

export default function BasicLink({ children, href="", align="left" , onClick=null}) {
	return (
		<>
			{onClick ? (
				<div onClick={onClick}><CustomLink href={href} align={align}>{children}</CustomLink></div>
				
			) : (
				<CustomLink href={href} align={align}>{children}</CustomLink>
			)}
		</>
	);
}
