"use client"

import { PiSidebarSimpleFill } from "react-icons/pi";
import CustomLink from "@/components/custom_link/custom_link";
import styles from "./style.module.css"
import CustomToggle from "../custom_toggle/custom_toggle";
import { useState } from "react";

export default function DashNavbar() {
	// ===== Menu toggles
	const [menuToggled, setMenuToggled] = useState(true);
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};
	return (
		<>
			<div 
				className={`
					${styles.container_spacer} 
					${menuToggled && styles.container_open}
					`}
			
			></div>
			<div 
				className={`
					${styles.container} 
					${menuToggled && styles.container_open}
					`}
			
			>
				<CustomToggle align="vertical" toggleState={updateMenuToggled}>
					<div className="align_right"><PiSidebarSimpleFill size={25} cursor="pointer"/></div>
				</CustomToggle>
				<hr className="hr_surface_color_2"/>
				{menuToggled && (
					<>
						<CustomLink type="vertical" href="/dash">
							Dashboard
						</CustomLink>
						<CustomLink type="vertical" href="/dash/account">
							Account
						</CustomLink>
						<CustomLink type="vertical" href="/dash/messages">
							Messages
						</CustomLink>
						<CustomLink type="vertical" href="/dash/products">
							Products
						</CustomLink>
						<CustomLink type="vertical" href="/dash/entities">
							Entities
						</CustomLink>
					</>
				)}
				
			</div>
		</>
	);
}