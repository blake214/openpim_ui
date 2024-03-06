import styles from "./style.module.css";

export default function Skeleton({ height="15", width=null }) {
	const randomPercent = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
	return (
		<div 
			className={`${styles.skeleton_placeholder}`} 
			style={{ width: `${width ? (width) : (randomPercent)}%`, height: `${height}px` }}
		></div>
	)
}