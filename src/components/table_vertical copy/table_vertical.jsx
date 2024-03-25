"use client"

import styles from "./style.module.css";
import { FaRegEdit } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { CgUndo } from "react-icons/cg";
import { useRef, useState, useEffect } from 'react'
import { CgScrollH } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
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




	const scrollableRef = useRef(null);
	const [isHiddenLeft, setIsHiddenLeft] = useState(false);
	const [isHiddenRight, setIsHiddenRight] = useState(false);

	useEffect(() => {
		const checkScroll = () => {
			if (scrollableRef.current) {
				

				const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;

				setIsHiddenLeft(scrollLeft > 0);
				// Add ten to normalise small values
				setIsHiddenRight(scrollWidth - scrollLeft < clientWidth + 10);
			}
			};

			if (scrollableRef.current) {
			scrollableRef.current.addEventListener('scroll', checkScroll);
			}

			return () => {
			if (scrollableRef.current) {
				scrollableRef.current.removeEventListener('scroll', checkScroll);
			}
		};
	}, []);
	console.log("isHiddenLeft", isHiddenLeft)
	console.log("setIsHiddenRight", isHiddenRight)



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
					<CustomLink component_type="vertical" href="/about">About</CustomLink>
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
				
				


				<div className={styles.container_primary_horizonatal_row}>
					<div className={styles.container_horizontal_lhs_dots}><BsThreeDots /></div>
					<div className={styles.container_scrollable_horizonatal_row} ref={scrollableRef}>
						<div className={styles.container_scrollable_horizonatal_row_column}>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
						</div>
						<hr/>
						<div className={styles.container_scrollable_horizonatal_row_column}>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
						</div>
						<hr/>
						<div className={styles.container_scrollable_horizonatal_row_column}>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
						</div>
						<hr/>
						<div className={styles.container_scrollable_horizonatal_row_column}>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
							<p className={styles.container_scrollable_horizonatal_row_column_content}>aaa</p>
						</div>
					</div>
					<div className={styles.container_horizontal_rhs_dots}><BsThreeDots /></div>
				</div>




			</div>
		</div>
		</>
	)
}