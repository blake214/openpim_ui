"use client"
import styles from "./style.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import startCase from 'lodash/startCase';

export default function DashTrailHeading() {
	const location = usePathname()
	const pathnames = location.split('/').filter(x => x)
	// ===== Check server
	/** Check if server rendered this
	 * As server doesnt have localStorage
	*/
	const [mounted, setMounted] = useState(false)
	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return <></>
	// ===== Check server
	return (
		<div className={styles.container}>
			<nav>
				<ul>
					{pathnames.map((value, index) => {
						const first = index == 0
						const last = index == pathnames.length -1
						const href = `/${pathnames.slice(0, index + 1).join('/')}`
						let title = value
						// Lets check if its a local_key
						if(title.includes("_openpimkey")) {
							const element = JSON.parse(localStorage.getItem(value))
							title = element.title
						}
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