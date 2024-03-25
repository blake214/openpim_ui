"use client"

import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import styles from "./style.module.css";
import RowVertical from "./row/row";

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
export default function TableVertical({
	tableContent=null, // This is just the object as 'state'
	tableContentState=null, // This is a state object [state, setState]
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


	const scrollableRef = useRef(null);

	return (
		<>
		<div className={styles.body_container}>

				<div className={styles.container_primary_horizonatal_row}>
					<div className={styles.container_horizontal_lhs_dots}><BsThreeDots /></div>
						
							<div className={styles.container_scrollable_horizonatal_row_column}>
								{tableContent?.map((item, index) => (
									<div key={index} className={styles.container_scrollable_horizonatal_row_column_content}>
										{/* <RowVertical index={index} item={item} numbers={numbers}/> */}
										aaaaa
									</div>
									
								))}
							</div>
						
					<div className={styles.container_horizontal_rhs_dots}><BsThreeDots /></div>
				</div>



			<hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>


			{tableContentState?.tableContent.map((item, index) => (
				<div key={index} className={styles.container_primary_horizonatal_row}>
					<div className={styles.container_horizontal_lhs_dots}><BsThreeDots /></div>
					<RowVertical index={index} item={item} checks={checks} numbers={numbers} checkBoxHandler={handleCheckboxChange}/>
					<div className={styles.container_horizontal_rhs_dots}><BsThreeDots /></div>
				</div>
			))}
			
			<hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>

			{tableContent?.map((item, index) => (
				<div key={index} className={styles.container_primary_horizonatal_row}>
					<div className={styles.container_horizontal_lhs_dots}><BsThreeDots /></div>
						<div className={styles.container_scrollable_horizonatal_row_column}>
							<RowVertical index={index} item={item} numbers={numbers}/>
						</div>
					<div className={styles.container_horizontal_rhs_dots}><BsThreeDots /></div>
				</div>
			))}

</div>
		</>
	)
}