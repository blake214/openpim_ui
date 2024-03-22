"use client"

import styles from "../style.module.css";
import { IoMdMenu } from "react-icons/io";
import { CgUndo } from "react-icons/cg";
import { RiEdit2Line } from "react-icons/ri";
import { useRef, useState, useEffect } from 'react'

export default function ContentBlockHeader({ title="", undoClick=null, editClick=null, menuComponents=null }) {
	// ===== States
	const [menuToggled, setMenuToggled] = useState(false);
	// ===== States

	// ===== General
	const component_ref = useRef(null);
	// ===== General

	// ======= Event Handlers
	const updateMenuToggled = (event) => {
		event.preventDefault();
		setMenuToggled(!menuToggled);
	};
	// ======= Event Handlers

	// ======= Effects
	useEffect(() => {
		const handleClickOutside = (event) => {
			// Check if the clicked element is not one of component_ref, close all toggles
			if(component_ref.current && !component_ref.current.contains(event.target)) setMenuToggled(false);
		}
		if(menuToggled && menuComponents) {
			document.addEventListener('mousedown', handleClickOutside);
			// ========== Cleanup
            return () => document.removeEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [menuToggled]);
	// ======= Effects

	return (
		<div className={styles.container_block_header}>
			<div className={styles.container_block_title}>
				<b>{title}</b>
				<div className="align_right">
					{undoClick && <button onClick={undoClick}><CgUndo size={20} cursor="pointer"/></button>}
					{editClick && <button onClick={editClick}><RiEdit2Line size={20} cursor="pointer"/></button>}
					{menuComponents && <button onClick={updateMenuToggled}><IoMdMenu size={20} cursor="pointer"/></button>}
				</div>
			</div>
			{menuToggled &&
				<div ref={component_ref} className={styles.block_list_container}>{menuComponents}</div>
			}
		</div>
	);
}