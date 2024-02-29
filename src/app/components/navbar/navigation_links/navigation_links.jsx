"use client"

import styles from "./navigation_links.module.css"
import CustomLink from "../../custom_link/custom_link";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import CustomToggle from "../../custom_toggle/custom_toggle";

export default function NavigationLinks() {
	const [menuToggled, setMenuToggled] = useState(false);
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};

	// ===== This block for differenciating when a user or server had rendered this
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return null
	// ===== This block for differenciating when a user or server had rendered this


	return (
		<div className={styles.container}>
			<CustomLink item={{ title: "Dash", path: "/dash" }}>
				Dash
			</CustomLink>
			<CustomToggle>
				<FaUser size={25} cursor="pointer"/>
			</CustomToggle>
			<CustomToggle state={menuToggled} toggleState={updateMenuToggled}>
				<IoMdMenu size={25} cursor="pointer"/>
			</CustomToggle>

			{menuToggled ? (
				<>worms</>
			) : (
				<>worms2</>
			)}



			The current theme is: {theme}
			{theme === "dark" ? (
				<button onClick={() => setTheme("light")}>A</button>
			) : (
				<button onClick={() => setTheme("dark")}>B</button>
			)}
		</div>
	);
}