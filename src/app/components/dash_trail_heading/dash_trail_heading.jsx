"use client"
import styles from "./style.module.css"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashTrailHeading({ children }) {
	const location = usePathname()
	const pathnames = location.split('/').filter(x => x)
	return (
		<div className={styles.container}>
			<nav>
				<ul>
					{pathnames.map((value, index) => {
						const last = index == pathnames.length -1
						const href = `/${pathnames.slice(0, index + 1).join('/')}`
						const title = value
						return (
							<li key={href}>
								<span>/</span>
								{
									last ? (
										<b>{title}</b>
									) : (
										<Link href={href}>{title}</Link>
									)
								}
							</li>
						)
					})}
				</ul>
			</nav>
		</div>
	);
}