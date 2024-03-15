"use client"

import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";

export default function EditUserPasswordPassword({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content);
    const [passwordRepeat, setPasswordRepeat] = useState("");
    // ======= States

    // ======= Event Handlers
    const handelChangeLocalStorageData = (e) => {
        const { name, value } = e.target;
        if(name == "password_repeat") setPasswordRepeat(value)
        else setLocalStorageData(value);
    };
    const handleSave = () => {
        // Check passwords are the same
        if(localStorageData != passwordRepeat) return alert("Passwords dont match")
        // Update the variable
        localStorage?.setItem(lastRoute, JSON.stringify({
            ...stored_element,
            content: localStorageData
        }));
        // Go back to previous step
        router.push(prevRoute)
    }
    // ======= Event Handlers
    
	return (
		<>
            <h1>Edit Password</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <ContentBlock title="New">
                <TableHorizontal
					tableContent={[
                        {
                            items: [
                                {
                                    title: "Password",
                                    content: [
                                        <input type="password" name="password" value={localStorageData} onChange={handelChangeLocalStorageData} placeholder="Password"/>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "Repeat Password",
                                    content: [
                                        <input type="password" name="password_repeat" value={passwordRepeat} onChange={handelChangeLocalStorageData} placeholder="Repeat Password"/>
                                    ]
                                }
                            ]
                        }
                    ]}
				/>
            </ContentBlock>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="flex">
                <div className={`button_fixed_width align_right`}>
                    <CustomButton component_type="vertical" onClick={handleSave}>Save</CustomButton>
                </div>
            </div>
		</>
	);
}