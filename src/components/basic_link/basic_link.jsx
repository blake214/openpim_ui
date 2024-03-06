import Link from "next/link";
import styles from "./style.module.css"

function CustomLink({ children, href="", align="left" }) {
	return (
		<Link
			href={href}
			className={`
				${styles.container}
				${align === "right" && ".align_right"}
				${align === "center" && styles.center}				
			`}
		>
			<div className={`
				${align === "left" && "align_left"}
				${align === "right" && "align_right"}
				${align === "center" && "align_center"}
			`}>{children}</div>
		</Link>
	);
}

export default function BasicLink({ children, href="", align="left" , onClick=false}) {
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
