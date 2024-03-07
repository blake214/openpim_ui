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
import { handleLogout } from "@/lib/action";
import { useSession } from "next-auth/react";


export default function Navbar() {
	const session = useSession()

	// ===== This for differenciating when a user or server had rendered this
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme } = useTheme();
	const { theme, setTheme } = useTheme()
	if(theme === "system") setTheme(resolvedTheme)

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
	return (
		<>
			<div className={styles.container_spacer}></div>
			<div className={styles.container}>
				<div className={styles.bar}>
					<CustomLink href="/"><FaBookOpen size={25} cursor="pointer"/></CustomLink>
					<NavigationLinks
						updateMenuObj={{state: menuToggled, updater: updateMenuToggled}}
						updateUserObj={{state: userToggled, updater: updateUserToggled}}
						logged_in={(session?.data?.user)}
						/>
				</div>
				{menuToggled && (
					<div ref={component_ref} className={styles.list_container}>
						<CustomLink type="vertical" href="/about" item={{ title: "About", path: "/about" }}>
							About
						</CustomLink>
						<CustomLink type="vertical" href="/documentation">
							Documentation
						</CustomLink>
						<CustomLink type="vertical" href="/articles">
							Articles
						</CustomLink>
						<CustomLink type="vertical" href="/demo">
							Demo
						</CustomLink>
						<CustomLink type="vertical" href="/disclaimer">
							Disclaimer
						</CustomLink>
						<CustomLink type="vertical" href="/terms">
							Terms
						</CustomLink>
						<CustomToggle align="vertical" state={themeToggled} toggleState={updateThemeToggled}>
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
					<>
						{session?.data?.user ? (
							<div ref={component_ref} className={styles.user_container}>
								<form action={handleLogout}>
									<CustomButton align="vertical" type="submit"> <MdLogout size={20} cursor="pointer"/> Logout </CustomButton>
								</form>
							</div>
						) : (
							<div ref={component_ref} className={styles.user_container}>
								<CustomLink type="vertical" href="/login"> Login </CustomLink>
								<CustomLink type="vertical" href="/register"> Register </CustomLink>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}