import styles from "../style.module.css";

/** 
 * check_box_state => this is a useState object as [state, setState] in a object as { isChecked:isChecked, setIsChecked:setIsChecked }
 */
export default function RowVertical({ number=null, check_box_state=null, children }) {
    const handleCheckboxChange = (event) => {
        check_box_state.setIsChecked(event.target.checked);
    };
	return (
		<div className={`
            ${(!number && !check_box_state) && styles.container_row_1}
            ${(((!number || !check_box_state) && (number || check_box_state))) && styles.container_row_2}
            ${(number && check_box_state) && styles.container_row_3}`}
        >
            {check_box_state && <div><input type="checkbox" checked={check_box_state.isChecked} onChange={handleCheckboxChange}/></div>}
            {number && <p>{number}</p>}
			<div>
                {children}
			</div>
		</div>
	)
}