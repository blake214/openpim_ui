"use client"

import { PiSidebarSimpleFill } from "react-icons/pi";
import { useState } from "react";
import CustomLink from "@/components/custom_link/custom_link";
import styles from "../style.module.css"
import CustomButton from "../custom_button/custom_button";

export default function DashNavbar() {
	// ======= States
	const [menuToggled, setMenuToggled] = useState(true);
	// ======= States

	// ======= Handlers
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};
	// ======= Handlers

	return (
		<>
			<div className={` ${styles.container_dash_nav_spacer} ${menuToggled && styles.container_dash_nav_open} `} />
			<div className={` ${styles.container_dash_nav} ${menuToggled && styles.container_dash_nav_open} `} >
				<CustomButton align="right" component_type="vertical" onClick={updateMenuToggled}>
					<PiSidebarSimpleFill size={25} cursor="pointer"/>
				</CustomButton>
				<hr className="hr_surface_color_2"/>
				{menuToggled && (
					<>
						<CustomLink component_type="vertical" href="/dash">
							Dashboard
						</CustomLink>
						<CustomLink component_type="vertical" href="/dash/account">
							Account
						</CustomLink>
						<CustomLink component_type="vertical" href="/dash/messages">
							Messages
						</CustomLink>
						<CustomLink component_type="vertical" href="/dash/products">
							Products
						</CustomLink>
						<CustomLink component_type="vertical" href="/dash/entities">
							Entities
						</CustomLink>
						<CustomLink component_type="vertical" href="/dash/temp">
							Temp
						</CustomLink>
					</>
				)}
			</div>
		</>
	);
}