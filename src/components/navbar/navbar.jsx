"use client"

import styles from "../style.module.css"
import CustomLink from "../custom_link/custom_link";
import CustomButton from "../custom_button/custom_button";
import { FaBookOpen } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { handleLogout } from "@/lib/action_server";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
	// ======= Hooks
	const session = useSession()
	// ======= Hooks

	// ======= States
	const { theme, resolvedTheme, setTheme } = useTheme()
	const [menuToggled, setMenuToggled] = useState(false);
	const [userToggled, setUserToggled] = useState(false);
	const [themeToggled, setThemeToggled] = useState(false);
	// ======= States

	// ======= General
	const component_ref = useRef(null);
	// ======= General

	// ================================================= Handlers
	// ======= Menu toggle
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};
	// ======= Menu toggle

	// ======= User menu toggle
	const updateUserToggled = () => {
		setUserToggled(!userToggled);
	};
	// ======= User menu toggle

	// ======= Theme toggle
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
	// ======= Theme toggle
	// ================================================= Handlers

	// ======= Effects
	useEffect(() => {
		if(resolvedTheme) setTheme(resolvedTheme)
	}, [resolvedTheme]);

	useEffect(() => {
		if(theme) setThemeToggled(theme === "dark")
	}, [theme]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			// Check if the clicked element is not one of component_ref, close all toggles
			if (component_ref.current && !component_ref.current.contains(event.target)) {
				setMenuToggled(false);
				setUserToggled(false);
			}
		}
		if(menuToggled || userToggled) {
			document.addEventListener('mousedown', handleClickOutside);
			// ========== Cleanup
            return () => document.removeEventListener('mousedown', handleClickOutside);
		}
		else document.removeEventListener('mousedown', handleClickOutside);
	}, [menuToggled, userToggled]);
	// ======= Effects

	return (
		<>
			<div className={styles.container_navbar_spacer}/>
			<div className={styles.container_navbar}>
				<div className={styles.container_navbar_bar}>
					<CustomLink href="/"><FaBookOpen size={25} cursor="pointer"/></CustomLink>
					<div className={styles.container_navbar_links}>
						{session?.data?.user && (
							<CustomLink href="/dash">
								<MdSpaceDashboard size={25} cursor="pointer"/>
							</CustomLink>
						)}
						<CustomButton state={userToggled} onClick={updateUserToggled}>
							<FaUser size={25} cursor="pointer"/>
						</CustomButton>
						<CustomButton state={menuToggled} onClick={updateMenuToggled}>
							<IoMdMenu size={25} cursor="pointer"/>
						</CustomButton>
					</div>
				</div>
				{menuToggled && (
					<div ref={component_ref} className={styles.container_navbar_list}>
						<CustomLink component_type="vertical" href="/about">
							About
						</CustomLink>
						<CustomLink component_type="vertical" href="/documentation">
							Documentation
						</CustomLink>
						<CustomLink component_type="vertical" href="/articles">
							Articles
						</CustomLink>
						<CustomLink component_type="vertical" href="/demo">
							Demo
						</CustomLink>
						<CustomLink component_type="vertical" href="/disclaimer">
							Disclaimer
						</CustomLink>
						<CustomLink component_type="vertical" href="/terms">
							Terms
						</CustomLink>
						<CustomButton component_type="vertical" state={themeToggled} onClick={updateThemeToggled}>
							{themeToggled ? (
								<>
								<MdLightMode size={20} cursor="pointer"/>
								Light Mode
								</>
							) : (
								<>
								<MdDarkMode size={20} cursor="pointer"/>
								Dark Mode
								</>
							)}
						</CustomButton>
					</div>
				)}
				{userToggled && (
					<>
						{session?.data?.user ? (
							<div ref={component_ref} className={styles.container_navbar_list}>
								<form action={handleLogout}>
									<CustomButton component_type="vertical" type="submit"> <MdLogout size={20} cursor="pointer"/> Logout </CustomButton>
								</form>
							</div>
						) : (
							<div ref={component_ref} className={styles.container_navbar_list}>
								<CustomLink component_type="vertical" href="/login"> Login </CustomLink>
								<CustomLink component_type="vertical" href="/register"> Register </CustomLink>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}