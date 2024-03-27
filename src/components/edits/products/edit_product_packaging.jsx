"use client"

import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import CustomTable from "@/components/custom_table/custom_table";
import { keyDictionary_product_packaging } from "@/lib/key_dictionary";

export default function EditProductPackaging({stored_element, location, lastRoute, prevRoute}) {
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

    // ======= Change Handlers
    const handelChangeLocalStorageData = (event) => {
        const { name, value } = event.target;
        setLocalStorageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleSave = (event) => {
        event.preventDefault();
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
            <h1>Edit Product Packaging</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <ContentBlock title="Product Packaging">
                <CustomTable
					tableContent={[
                        {
                            items: [
                                {
                                    title: "Packaging Type",
                                    content: [
                                        <select name="packaging_type" value={localStorageData.packaging_type} onChange={handelChangeLocalStorageData}>
                                            { Object.entries(keyDictionary_product_packaging).map(element => {
                                                return <option key={element[0]} value={element[0]}>{keyDictionary_product_packaging[element[0]]}</option>
                                            })}
                                        </select>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "width",
                                    content: [
                                        <input type="number" name="width" min={0} value={localStorageData.width} onChange={handelChangeLocalStorageData} placeholder="..."/>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "height",
                                    content: [
                                        <input type="number" name="height" min={0} value={localStorageData.height} onChange={handelChangeLocalStorageData} placeholder="..."/>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "depth",
                                    content: [
                                        <input type="number" name="depth" min={0} value={localStorageData.depth} onChange={handelChangeLocalStorageData} placeholder="..."/>
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    title: "weight",
                                    content: [
                                        <input type="number" name="weight" min={0} value={localStorageData.weight} onChange={handelChangeLocalStorageData} placeholder="..."/>
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