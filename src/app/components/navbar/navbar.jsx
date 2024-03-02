"use client"

import { FaBookOpen } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import styles from "./style.module.css"
import NavigationLinks from "./navigation_links/navigation_links";
import CustomLink from "../custom_link/custom_link";
import CustomToggle from "../custom_toggle/custom_toggle";
import CustomButton from "../custom_button/custom_button";

export default function Navbar() {
	// ===== This for differenciating when a user or server had rendered this
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// ===== Menu toggles
	const [menuToggled, setMenuToggled] = useState(false);
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};

	const [userToggled, setUserToggled] = useState(false);
	const updateUserToggled = () => {
		setUserToggled(!userToggled);
	};

	// ===== Theme toggles
	const [themeToggled, setThemeToggled] = useState(theme === "dark");
	const updateThemeToggled = () => {
		if(theme === "dark") {
			setTheme("light");
			setThemeToggled(!themeToggled);
		}
		else if(theme === "light") {
			setTheme("dark");
			setThemeToggled(!themeToggled);
		}
	};
	// ===== When a user clicks outside a box then we should close the modals
	const component_ref = useRef(null);
	useEffect(() => {
		function handleClickOutside(event) {
			// Check if the clicked element is not one of component_ref, close all toggles
			if (component_ref.current && !component_ref.current.contains(event.target)) {
				setMenuToggled(false);
				setUserToggled(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	// ===== useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return null
	return (
		<>
			<div className={styles.container_spacer}></div>
			<div className={styles.container}>
				<div className={styles.bar}>
					<CustomLink align_type="horizontal" item={{ title: "Home", path: "/" }}>
						<FaBookOpen size={25} cursor="pointer"/>
					</CustomLink>
					<NavigationLinks
						updateMenuObj={{state: menuToggled, updater: updateMenuToggled}}
						updateUserObj={{state: userToggled, updater: updateUserToggled}}
						/>
				</div>
				{menuToggled && (
					<div ref={component_ref} className={styles.list_container}>
						<CustomLink align_type="vertical" item={{ title: "About", path: "/about" }}>
							About
						</CustomLink>
						<CustomLink align_type="vertical" item={{ title: "Documentation", path: "/documentation" }}>
							Documentation
						</CustomLink>
						<CustomLink align_type="vertical" item={{ title: "Articles", path: "/articles" }}>
							Articles
						</CustomLink>
						<CustomLink align_type="vertical" item={{ title: "Demo", path: "/demo" }}>
							Demo
						</CustomLink>
						<CustomLink align_type="vertical" item={{ title: "Disclaimer", path: "/disclaimer" }}>
							Disclaimer
						</CustomLink>
						<CustomLink align_type="vertical" item={{ title: "Terms", path: "/terms" }}>
							Terms
						</CustomLink>
						<CustomToggle align_type="vertical" state={themeToggled} toggleState={updateThemeToggled}>
							{themeToggled ? (
								<>
								<MdLightMode size={25} cursor="pointer"/>
								Light Mode
								</>
							) : (
								<>
								<MdDarkMode size={25} cursor="pointer"/>
								Dark Mode
								</>
							)}
						</CustomToggle>
					</div>
				)}
				{userToggled && (
					<div ref={component_ref} className={styles.user_container}>
						<CustomButton align_type="vertical">
							<MdLogout size={25} cursor="pointer"/>
							Logout
						</CustomButton>
					</div>
				)}
			</div>
		</>
	);
}