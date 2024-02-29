"use client";
import Link from "next/link";
import styles from "./custom_link.module.css";
import { usePathname } from "next/navigation";

export default function CustomLink({ children, item }) {
	const pathName = usePathname();
	return (
		<Link
			href={item.path}
			className={`${styles.container} ${
				pathName === item.path && styles.active
			}`}
		>
			{children}
		</Link>
	);
}