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
				<CustomToggle align="verticle" toggleState={updateMenuToggled}>
					<div className="align_right"><PiSidebarSimpleFill size={25} cursor="pointer"/></div>
				</CustomToggle>
				<hr className="hr_surface_color_2"/>
				{menuToggled && (
					<>
						<CustomLink align="verticle" item={{ title: "Dashboard", path: "/dash" }}>
							Dashboard
						</CustomLink>
						<CustomLink align="verticle" item={{ title: "Account", path: "/dash/account" }}>
							Account
						</CustomLink>
						<CustomLink align="verticle" item={{ title: "Messages", path: "/dash/messages" }}>
							Messages
						</CustomLink>
						<CustomLink align="verticle" item={{ title: "Products", path: "/dash/products" }}>
							Products
						</CustomLink>
						<CustomLink align="verticle" item={{ title: "Entities", path: "/dash/entities" }}>
							Entities
						</CustomLink>
					</>
				)}
				
			</div>
		</>
	);
}