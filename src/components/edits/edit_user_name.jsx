"use client"

import styles from "./style.module.css"
import { buildContent } from "@/lib/helpers";
import { usePathname, useRouter } from 'next/navigation'
import { useState } from "react";
import KeyValueBlock from "../key_value_block/key_value_block";
import CustomButton from "../custom_button/custom_button";

export default function EditUserName({stored_element}) {
    const location = usePathname()
    const router = useRouter()
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    const prevRoute = location.replace(`/${lastRoute}`, "")

    const [formData, setFormData] = useState(content);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(value);
    };
    
    const handleSave = () => {
        localStorage.setItem(lastRoute, JSON.stringify({
            ...stored_element,
            content: formData
        }));
        router.push(prevRoute)
    }
    
	return (
		<>
            <div className={styles.title_container}>
				<b>New</b>
			</div>
			<div className={styles.body_container}>
                <KeyValueBlock title="Short">
                    <input className={styles.input_bar} type="text" name="short" value={formData} onChange={handleFormChange} placeholder="..."/>                   
                </KeyValueBlock>
			</div>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="flex">
                <div className={`${styles.button_block} align_right`}>
                    <CustomButton align="vertical" onClick={handleSave}>Save</CustomButton>
                </div>
            </div>
		</>
	);
}