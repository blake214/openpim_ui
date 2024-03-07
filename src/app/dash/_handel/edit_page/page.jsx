"use client"


import styles from "./style.module.css"
import EditProductTitle from "@/components/edits/edit_product_title";
import CustomButton from '@/components/custom_button/custom_button';
import KeyValueBlock from '@/components/key_value_block/key_value_block';
import { usePathname, useRouter } from 'next/navigation'
import { useState } from "react";

// function EditProductTitle({stored_element}) {

//     const router = useRouter()

//     const location = usePathname()
//     const parts = location.split('/');
//     const lastRoute = parts[parts.length - 1];
//     const prevRoute = location.replace(`/${lastRoute}`, "")


//     const [formData, setFormData] = useState(stored_element.content);
//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(value);
//     };
//     console.log(stored_element)
//     const handleChange = () => {
//         localStorage.setItem(lastRoute, JSON.stringify({
//             type: "edit",
//             edit_type: "product_title",
//             title: "product_title",
//             content: formData
//         }));
//         router.push(`${prevRoute}`)
//     }
// 	return (
// 		<div className={styles.container}>
//             <input type="text" name="email" value={formData} onChange={handleFormChange} placeholder="..."/>
//             <button onClick={handleChange}>Butts</button>
// 		</div>
// 	);
// }


export default function EditPage({stored_element}) {
    /** Checking what editing object it is
     * Here we check what object we editing, and use the correct component
    */
    return (
        <div>
            <h1>Edit</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <p>Findout more</p>
            <br/>
            <br/>
            {stored_element.edit_type == "product_title" && <EditProductTitle stored_element={stored_element} />}
        </div>
    );
}