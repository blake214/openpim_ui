"use client"

import styles from "./style.module.css";
import { IoMdMenu } from "react-icons/io";
import { CgUndo } from "react-icons/cg";
import { RiEdit2Line } from "react-icons/ri";
import { useRef, useState, useEffect } from 'react'

export default function ContentBlockHeader({
	title="",
	undoClick=null,
	editClick=null,
	menuComponents=null,
}) {
	// ===== States
	const [menuToggled, setMenuToggled] = useState(false);
	// ===== States

	// ===== General
	const component_ref = useRef(null);
	// ===== General

	// ======= Event Handlers
	const updateMenuToggled = () => {
		setMenuToggled(!menuToggled);
	};
	function handleClickOutside(e) {
		// Check if the clicked element is not one of component_ref, close all toggles
		if (component_ref.current && !component_ref.current.contains(e.target)) setMenuToggled(false);
	}
	// ======= Event Handlers

	// ======= Effects
	useEffect(() => {
		if(menuComponents) document.addEventListener('mousedown', handleClickOutside);
	}, []);
	// ======= Effects

	return (
		<div className={styles.container}>
			<div className={styles.container_title}>
				<b>{title}</b>
				<div className="align_right">
					{undoClick && <button onClick={undoClick}><CgUndo size={20} cursor="pointer"/></button>}
					{editClick && <button onClick={editClick}><RiEdit2Line size={20} cursor="pointer"/></button>}
					{menuComponents && <button onClick={updateMenuToggled}><IoMdMenu size={20} cursor="pointer"/></button>}
				</div>
			</div>
			{menuToggled &&
				<div ref={component_ref} className={styles.list_container}>{menuComponents}</div>
			}
		</div>
	);
}