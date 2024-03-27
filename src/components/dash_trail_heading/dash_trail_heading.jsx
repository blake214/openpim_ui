"use client"

import styles from "../style.module.css"
import Link from "next/link";
import startCase from 'lodash/startCase';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mongoIdPath } from "@/lib/helpers";

export default function DashTrailHeading() {
	// ===== Hooks
	const location = usePathname()
	// ===== Hooks

	// ======= States
	const [mounted, setMounted] = useState(false)
	// ======= States

	// ===== General
	const pathnames = location.split('/').filter(x => x)
	// ===== General

	// ======= Effects
	useEffect(() => {
        setMounted(true)
    }, []);
	// ======= Effects

	if(!mounted) return (
		<div className={styles.container_trailing_heading}>
			<nav>
				<ul>...</ul>
			</nav>
		</div>
	);
	return (
		<div className={styles.container_trailing_heading}>
			<nav>
				<ul>
					{pathnames.map((value, index) => {
						const first = index == 0
						const last = index == pathnames.length -1
						const href = `/${pathnames.slice(0, index + 1).join('/')}`
						let title = value
						// Lets check if its a local_key
						if(title.includes("_openpimkey") && typeof localStorage !== "undefined") {
							const element = JSON.parse(localStorage.getItem(value))
							title = element.title
						}
						const mongo_id_path = mongoIdPath(title)
						if(mongo_id_path) title = mongo_id_path[1]
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