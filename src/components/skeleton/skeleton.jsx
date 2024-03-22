import styles from "../style.module.css";

export default function Skeleton({ height="15", width="50" }) {
	return (
		<div 
			className={`${styles.skeleton_placeholder}`} 
			style={{ width: `${width}%`, height: `${height}px` }}
		/>
	)
}