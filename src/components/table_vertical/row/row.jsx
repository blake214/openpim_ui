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
    console.log(item)
	return (
		<div className={styles.container_scrollable_horizonatal_row_column}>
            <div><input name={index} type="checkbox" checked={false}/></div>
            {checks && ("checked" in item) && checkBoxHandler && <div><input name={index} type="checkbox" checked={item.checked} onChange={checkBoxHandler}/></div>}
            {numbers && index && <p>{index}</p>}
            {item.items.map((item, index) => (
                <div key={index} className={styles.container_scrollable_horizonatal_row_column_content}>
                    {item.content.map((item, index) => (
                        <div key={index}>
                            {item}
                        </div>
                    ))}
                </div>
            ))}
		</div>
	)
}