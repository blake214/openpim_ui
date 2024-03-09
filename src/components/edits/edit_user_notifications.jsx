"use client"

import styles from "./style.module.css"
import { buildContent } from "@/lib/helpers";
import { usePathname, useRouter } from 'next/navigation'
import { useState } from "react";
import KeyValueBlock from "../key_value_block/key_value_block";
import CustomButton from "../custom_button/custom_button";

export default function EditUserNotifications({stored_element}) {
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
                <KeyValueBlock title="Product Changes">
                    <select name="product_changes" value={formData.product_changes} onChange={handleFormChange}>
                        <option value="AAPA">No notifications</option>
                        <option value="AAPB">App notifications</option>
                        <option value="AAPC">Email notifications</option>
                    </select>
                </KeyValueBlock>
                <KeyValueBlock title="Product Issues">
                    <select name="product_issues" value={formData.product_issues} onChange={handleFormChange}>
                        <option value="AAPA">No notifications</option>
                        <option value="AAPB">App notifications</option>
                        <option value="AAPC">Email notifications</option>
                    </select>
                </KeyValueBlock>
                <KeyValueBlock title="Entity Changes">
                    <select name="entity_changes" value={formData.entity_changes} onChange={handleFormChange}>
                        <option value="AAPA">No notifications</option>
                        <option value="AAPB">App notifications</option>
                        <option value="AAPC">Email notifications</option>
                    </select>
                </KeyValueBlock>
                <KeyValueBlock title="Entity Issues">
                    <select name="entity_issues" value={formData.entity_issues} onChange={handleFormChange}>
                        <option value="AAPA">No notifications</option>
                        <option value="AAPB">App notifications</option>
                        <option value="AAPC">Email notifications</option>
                    </select>
                </KeyValueBlock>
                <KeyValueBlock title="Entity Product Links">
                    <select name="entity_product_links" value={formData.entity_product_links} onChange={handleFormChange}>
                        <option value="AAPA">No notifications</option>
                        <option value="AAPB">App notifications</option>
                        <option value="AAPC">Email notifications</option>
                    </select>
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