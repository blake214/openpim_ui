"use client"
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import styles from "../style.module.css"

export default function SectionBlockMinimizer({ heading, start_state, children }) {
	// ======= States
	const [contentToggled, setContentToggled] = useState(start_state === "true");
	// ======= States

	// ======= Event Handlers
	const updateContentToggled = () => {
		setContentToggled(!contentToggled);
	};
	// ======= Event Handlers
	
	return (
		<>
			<div className={styles.container_section_block_minimizer_heading}>
				<h3>{heading}</h3>
				<div className="align_right">
					<button onClick={updateContentToggled}>
						{contentToggled ? (
							<CiCircleMinus size={20} cursor="pointer"/>
						) : (
							<CiCirclePlus size={20} cursor="pointer"/>
						)}
					</button>
				</div>
			</div>
			{contentToggled && (
				<>
					<br/>
					{children}
				</>
			)}
		</>
	);
}