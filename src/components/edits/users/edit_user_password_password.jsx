"use client"

import styles from "../style.module.css"
import { buildContent } from "@/lib/helpers";
import { usePathname, useRouter } from 'next/navigation'
import { useState } from "react";
import KeyValueBlock from "../../key_value_block/key_value_block";
import CustomButton from "../../custom_button/custom_button";

export default function EditUserPasswordPassword({stored_element}) {
    const location = usePathname()
    const router = useRouter()
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    const prevRoute = location.replace(`/${lastRoute}`, "")

    const [formData, setFormData] = useState(content);
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if(name == "password_repeat") setPasswordRepeat(value)
        else setFormData(value);
    };
    
    const handleSave = () => {
        // Check passwords are the same
        if(formData != passwordRepeat) return alert("Passwords dont match")
        // Update stored item
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
                <KeyValueBlock title="Password">
                    <input type="password" name="password" value={formData} onChange={handleFormChange} placeholder="Password"/>                   
                </KeyValueBlock>
                <br/>
                <KeyValueBlock title="Repeat Password">
                    <input type="password" name="password_repeat" value={passwordRepeat} onChange={handleFormChange} placeholder="Repeat Password"/>                   
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