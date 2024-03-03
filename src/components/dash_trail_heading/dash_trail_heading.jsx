"use client"
import styles from "./style.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";
import startCase from 'lodash/startCase';

export default function DashTrailHeading() {
	const location = usePathname()
	const pathnames = location.split('/').filter(x => x)
	return (
		<div className={styles.container}>
			<nav>
				<ul>
					{pathnames.map((value, index) => {
						const first = index == 0
						const last = index == pathnames.length -1
						const href = `/${pathnames.slice(0, index + 1).join('/')}`
						const title = value
						return (
							<li key={href}>
								{!first && (<span>/</span>)}
								{
									last ? (
										<b>{startCase(title)}</b>
									) : (
										<Link href={href}>{startCase(title.replace('_', ' '))}</Link>
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