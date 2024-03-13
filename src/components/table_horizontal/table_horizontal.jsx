"use client"

import { useState } from "react";
import styles from "./style.module.css";
import RowHorizontal from "./row/row";

/** tableContentState
 * This is a state that we parse in in the following structure
{
	tableContent: [
		{
			checked: true,
			items: [
				{
					title: "Title1",
					content: [
						<p>content1</p>
					]
				}
			]
		}
	],
	setTableContent: setTableContent
}
*/
export default function TableHorizontal({
	tableContent=null,
	tableContentState=null,
	checks=false,
	numbers=false,
}) {
	// ===== States
	const [isChecked, setIsChecked] = useState(false);
	// ===== States

	// ===== Handlers
	const handlePrimaryCheckboxChange = (e) => {
		const { checked } = e.target;
		if(!tableContentState) return
		let new_content = [...tableContentState.tableContent]
		new_content = tableContentState.tableContent.map(element => ({
			...element,
			checked: checked
		}))
		tableContentState.setTableContent(new_content)
		setIsChecked(checked)
    };
	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		if(!tableContentState) return
		let new_content = [...tableContentState.tableContent]
		new_content[name] = {
			...new_content[name],
			checked: checked
		}
		tableContentState.setTableContent(new_content)
    };
	// ===== Handlers

	return (
		<>
			<div className={`
				${(!numbers && !checks) && styles.container_row_1}
				${(((numbers || checks))) && styles.container_row_2}`}
			>
				{checks && <div><input type="checkbox" checked={isChecked} onChange={handlePrimaryCheckboxChange}/></div>}
				{numbers && <p>No</p>}
			</div>
			{checks || numbers && <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>}
			{tableContentState?.tableContent.map((item, index) => (
				<div key={index}>
					<RowHorizontal index={index} item={item} checks={checks} numbers={numbers} checkBoxHandler={handleCheckboxChange}/>
				</div>
			))}
			{tableContent?.map((item, index) => (
				<div key={index}>
					<RowHorizontal index={index} item={item}/>
				</div>
			))}
		</>
	)
}