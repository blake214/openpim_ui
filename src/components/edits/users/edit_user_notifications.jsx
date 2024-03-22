"use client"

import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { keyDictionary_notifications } from "@/lib/key_dictionary";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";

export default function EditUserNotifications({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content);
    // ======= States

    // ======= Event Handlers
    const handelChangeLocalStorageData = (e) => {
        const { name, value } = e.target;
        setLocalStorageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSave = () => {
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
            <h1>Edit Notifications</h1>
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
                                    title: "Product Changes",
                                    content: [
                                        <select name="product_changes" value={localStorageData.product_changes} onChange={handelChangeLocalStorageData}>
                                            { Object.entries(keyDictionary_notifications).map(element => {
                                                return <option key={element[0]} value={element[0]}>{keyDictionary_notifications[element[0]]}</option>
                                            })}
                                        </select>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "Product Issues",
                                    content: [
                                        <select name="product_issues" value={localStorageData.product_issues} onChange={handelChangeLocalStorageData}>
                                            { Object.entries(keyDictionary_notifications).map(element => {
                                                return <option key={element[0]} value={element[0]}>{keyDictionary_notifications[element[0]]}</option>
                                            })}
                                        </select>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "Entity Changes",
                                    content: [
                                        <select name="entity_changes" value={localStorageData.entity_changes} onChange={handelChangeLocalStorageData}>
                                            { Object.entries(keyDictionary_notifications).map(element => {
                                                return <option key={element[0]} value={element[0]}>{keyDictionary_notifications[element[0]]}</option>
                                            })}
                                        </select>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "Entity Issues",
                                    content: [
                                        <select name="entity_issues" value={localStorageData.entity_issues} onChange={handelChangeLocalStorageData}>
                                            { Object.entries(keyDictionary_notifications).map(element => {
                                                return <option key={element[0]} value={element[0]}>{keyDictionary_notifications[element[0]]}</option>
                                            })}
                                        </select>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "Entity Product Links",
                                    content: [
                                        <select name="entity_product_links" value={localStorageData.entity_product_links} onChange={handelChangeLocalStorageData}>
                                            { Object.entries(keyDictionary_notifications).map(element => {
                                                return <option key={element[0]} value={element[0]}>{keyDictionary_notifications[element[0]]}</option>
                                            })}
                                        </select>
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