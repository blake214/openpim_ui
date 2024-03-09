"use client"

import styles from "./style.module.css";
import { FaRegEdit } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { CgUndo } from "react-icons/cg";
import { useRef, useState, useEffect } from 'react'
import CustomLink from "@/components/custom_link/custom_link";


export default function TableVertical({
	children,
	title="",
	numbers=false,
	undoClick=null,
	editClick=null,
	check_box_state=null,
}) {
	// ===== States
	const [menuToggled, setMenuToggled] = useState(false);
	// ===== States

	// ===== Handlers
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};
	const handleCheckboxChange = (event) => {
        check_box_state.setIsChecked(event.target.checked);
    };
	// ===== Handlers

	// ===== Handel menu list
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
	// ===== Handel menu list

	return (
		<>
		<div className={styles.container_table}>
			<div className={styles.container_title}>
				<b>{title}</b>
				<div className="align_right">
					{undoClick && <button onClick={undoClick}><CgUndo size={20} cursor="pointer"/></button>}
					{editClick && <button onClick={editClick}><FaRegEdit size={20} cursor="pointer"/></button>}
					<button onClick={updateMenuToggled}><IoMdMenu size={20} cursor="pointer"/></button>
				</div>
			</div>
			{menuToggled && 
				<div ref={component_ref} className={styles.list_container}>
					<CustomLink type="vertical" href="/about">About</CustomLink>
				</div>
			}
			<div className={styles.body_container}>
				<div className={`
					${(!numbers && !check_box_state) && styles.container_row_1}
					${(((numbers || check_box_state))) && styles.container_row_2}`}
				>
					{check_box_state && <div><input type="checkbox" checked={check_box_state.isChecked} onChange={handleCheckboxChange}/></div>}
					{numbers && <p>No</p>}
				</div>
				<hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
				
				


				
				<div className={styles.row_test}>
					<p>aaa</p>
					<p>aaa</p>
					<p></p>
					<p>aaa</p>
					<p>aaa</p>
				</div>




			</div>
		</div>
		</>
	)
}