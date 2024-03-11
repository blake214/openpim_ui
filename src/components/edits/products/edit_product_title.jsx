"use client"

import styles from "../style.module.css"
import { buildContent } from "@/lib/helpers";
import { usePathname, useRouter } from 'next/navigation'
import { useState } from "react";
import KeyValueBlock from "../../key_value_block/key_value_block";
import CustomButton from "../../custom_button/custom_button";

export default function EditProductTitle({stored_element}) {
    const location = usePathname()
    const router = useRouter()
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const built = buildContent(stored_element_temp)
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    const prevRoute = location.replace(`/${lastRoute}`, "")

    const [formData, setFormData] = useState(built);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                    <input type="text" name="short" value={formData.short} onChange={handleFormChange} placeholder="..."/>                   
                </KeyValueBlock>
                <KeyValueBlock title="Long">
                    <input type="text" name="long" value={formData.long} onChange={handleFormChange} placeholder="..."/>                   
                </KeyValueBlock>
			</div>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="flex">
                <div className={`button_fixed_width align_right`}>
                    <CustomButton align="vertical" onClick={handleSave}>Save</CustomButton>
                </div>
            </div>
		</>
	);
}