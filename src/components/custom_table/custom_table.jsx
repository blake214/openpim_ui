"use client"

import { useState } from "react";
import styles from "./style.module.css";
import RowHorizontal from "./row/row_horizontal";
import RowVertical from "./row/row_vertical";

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
export default function CustomTable({
	tableContent=null, // This is just the object as 'state'
	tableContentState=null, // This is a state object [state, setState]
	checks=false,
	numbers=false,
	orientation="vertical"
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

	if(!tableContent?.length && !tableContentState?.tableContent?.length) return <>No content...</>

	return (
		<>
			{orientation == "vertical" ? (
				<>
					<div className={`
						${(!numbers && !checks) && styles.container_row_1}
						${(numbers || checks) && styles.container_row_2}`}
					>
						{checks && <div><input type="checkbox" checked={isChecked} onChange={handlePrimaryCheckboxChange}/></div>}
						{numbers && <p>No</p>}
					</div>
					{(checks || numbers) && <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>}
					{tableContentState?.tableContent.map((item, index) => (
						<div key={index}>
							<RowVertical index={index} item={item} checks={checks} numbers={numbers} checkBoxHandler={handleCheckboxChange}/>
							<br/>
						</div>
					))}
					{tableContent?.map((item, index) => (
						<div key={index}>
							<RowVertical index={index} item={item} numbers={numbers}/>
							<br/>
						</div>
					))}
				</>
			) : (
				<div className={styles.container_horizontal_table}>
					<div className={styles.container_scrolled_columns}>
						<table className={styles.horizontal_table}>
							<thead>
								<tr>
									{checks && <th><input type="checkbox" checked={isChecked} onChange={handlePrimaryCheckboxChange}/></th>}
									{numbers && <th className={styles.td_num}>No</th>}
									{tableContentState?.tableContent[0].items.map(element => (
										<th key={element.title}>{element.title}</th>
									))}
									{tableContent?.length && tableContent[0].items.map(element => (
										<th key={element.title}>{element.title}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{tableContentState?.tableContent.map((item,index) => (
									<tr key={index}>
										<RowHorizontal index={index} item={item} checks={checks} numbers={numbers} checkBoxHandler={handleCheckboxChange}/>
									</tr>
								))}
								{tableContent?.map((item,index) => (
									<tr key={index}>
										<RowHorizontal index={index} item={item} checks={checks} numbers={numbers} checkBoxHandler={handleCheckboxChange}/>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	)
}