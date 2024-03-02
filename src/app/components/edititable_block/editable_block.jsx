import KeyValueBlock from "../key_value_block/key_value_block";
import styles from "./style.module.css"
import { FaEdit } from "react-icons/fa";

export default function EditableBlock({ title, content, edit_event, children }) {
	return (
		<>
			<div className={styles.title_container}>
				<b>{title}</b>
				<div className="align_right">
					<button onClick={edit_event}><FaEdit size={20} cursor="pointer"/></button>
				</div>
			</div>
			<div className={styles.body_container}>
				{content.map(element => (
					<KeyValueBlock key={element.key} title={element.key}>{element.value}</KeyValueBlock>
				))}
			</div>
		</>
	);
}