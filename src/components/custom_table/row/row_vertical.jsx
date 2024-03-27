import styles from "../style.module.css";

/** item
 * This is a object
{
    checked: true, (optional)
    items: [
        {
            title: "Title1",
            content: [
                <p>content1</p>
            ]
        }
    ]
}
*/
export default function RowVertical({ index=null, item=null, checks=null, numbers=null, checkBoxHandler=null }) {
	return (
		<div className={`
            ${(!numbers && !checks) && styles.container_row_1}
            ${(((!numbers || !checks) && (numbers || checks))) && styles.container_row_2}
            ${(numbers && checks) && styles.container_row_3}`}
        >
            {checks && ("checked" in item) && checkBoxHandler && <div><input name={index} type="checkbox" checked={item.checked} onChange={checkBoxHandler}/></div>}
            {numbers && index != null && <p>{index}</p>}
            <div>
                {item.items.map((item, index) => (
                    <div key={index}>
                        <div className={styles.container_row_content}>
                            <p>{item.title}<span className={styles.title_right_colon}>:</span></p>
                            <div>
                                {item.content.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
			</div>
		</div>
	)
}