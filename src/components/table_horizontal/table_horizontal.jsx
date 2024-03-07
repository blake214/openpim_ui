"use client"

import styles from "./style.module.css";
import { FaEdit } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { FaUndo } from "react-icons/fa";
import CustomLink from "../custom_link/custom_link";
import { useRef, useState, useEffect } from 'react'

export default function TableHorizontal({
	children,
	title="",
	rows="horizontal",
	undoClick=false,
	editClick=false,
}) {
	const [menuToggled, setMenuToggled] = useState(false);
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};
	// ===== When a user clicks outside a box then we should close the modals
	const component_ref = useRef(null);
	useEffect(() => {
		function handleClickOutside(event) {
			// Check if the clicked element is not one of component_ref, close all toggles
			if (component_ref.current && !component_ref.current.contains(event.target)) {
				setMenuToggled(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<>
		<div className={styles.container}>

		
			<div className={styles.title_container}>
				<b>{title}</b>
				<div className="align_right">
					{undoClick && <button onClick={undoClick}><FaUndo size={20} cursor="pointer"/></button>}
					{editClick && <button onClick={editClick}><FaEdit size={20} cursor="pointer"/></button>}
					<button onClick={updateMenuToggled}><IoMdMenu size={20} cursor="pointer"/></button>
				</div>
			</div>
			{menuToggled && (
				<div ref={component_ref} className={styles.list_container}>
					<CustomLink align="vertical" href="/about">
						About
					</CustomLink>
				</div>
			)}
			<div className={styles.body_container}>
				{rows=="horizontal" && (
					<>
					No
					<hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
					</>
				)}

				{children}
			</div>
		</div>
		</>
	)
}