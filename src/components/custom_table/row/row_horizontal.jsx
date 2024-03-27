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
export default function RowHorizontal({ index=null, item=null, checks=null, numbers=null, checkBoxHandler=null }) {
	return (
        <>
            {checks && ("checked" in item) && checkBoxHandler && <td><input name={index} type="checkbox" checked={item.checked} onChange={checkBoxHandler}/></td>}
            {numbers && index != null && <td className={styles.td_num}>{index}</td>}
            {item.items.map(element => (
                <td key={element.title}>
                    {element.content.length == 1 ? (<>{element.content[0]}</>) : (<>...</>)}
                </td>
            ))}
        </>
	)
}