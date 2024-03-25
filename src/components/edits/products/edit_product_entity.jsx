"use client"

import { buildContent, isLocalUuidKey } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { handleCreateUnregisteredEntity } from "@/lib/action_user";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";

export default function EditProductEntity({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const form_data = stored_element_temp.form_data
    const content = buildContent(stored_element_temp)
    // ======= General

    // ======= States
    // Remember content can be an ID or possibly a object for creating a entity.
    const [localStorageData, setLocalStorageData] = useState(content);
    const [currentEntity, setCurrentEntity] = useState([{
        checked: false,
        items: [
            {
                title: "Entity Id",
                content: [content]
            }
        ]
    }]);
    // Add form states
    const [addEntity, setAddEntity] = useState("");
    // ======= States

    // ======= Change Handlers
    const handleChangeAddFormData = (event) => {
        const { name, value } = event.target;
        if(name == "entity_id") setAddEntity(value);
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleCreateUnregisteredEntity_event = (event) => {
        event.preventDefault();
        // Create an object
        const entity_id = handleCreateUnregisteredEntity()
        // Update the storage to point to the new object
        localStorage?.setItem(lastRoute, JSON.stringify({
            ...stored_element,
            content: localStorageData,
            form_data: {
                addEntity: entity_id
            }
        }));
        // Route to edit that object
        router.push(`${location}/${entity_id}`)
    }
    const handleAdd = (event) => {
        event.preventDefault();
        // Update states
        setLocalStorageData(addEntity)
        setCurrentEntity([{
            checked: false,
            items: [
                {
                    title: "Entity Id",
                    content: [addEntity]
                }
            ]
        }])
    }
    const handleSave = (event) => {
        event.preventDefault();
        // Delete form data if it exists
        const new_stored_element = {
            ...stored_element
        }
        delete new_stored_element['form_data']
        // Update the variable
        localStorage?.setItem(lastRoute, JSON.stringify({
            ...new_stored_element,
            content: localStorageData
        }));
        // Go back to previous step
        router.push(prevRoute)
    }
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        // Check if there is persistent form data
        if(form_data) {
            if(form_data.addEntity && isLocalUuidKey(form_data.addEntity)) {
                // Lets get the record from local storage
                let persistent_addEntity = localStorage?.getItem(form_data.addEntity);
                if(persistent_addEntity) {
                    // As its stored in a string lets parse it
                    persistent_addEntity = JSON.parse(persistent_addEntity)
                    // Lets check if its a complete object
                    if(persistent_addEntity.sub_type == "entity_id") {
                        setAddEntity(persistent_addEntity.content)
                    }
                }
            }
        }
    }, [])
    // ======= Effects
    
	return (
		<>
            <h1>Edit Product Entity</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <form onSubmit={handleAdd}>
                <ContentBlock title="Add Product Entity">
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Entity Id",
                                        content: [
                                            <input type="text" name="entity_id" value={addEntity} onChange={handleChangeAddFormData} placeholder="..." required/>
                                        ]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
                <div className="flex">
                    <div className={`button_fixed_width align_right`}>
                        <CustomButton component_type="vertical" type="submit">Add</CustomButton>
                    </div>
                </div>
            </form>
            <br/>
            <div className={"button_fixed_width align_right"}><CustomButton component_type="vertical" onClick={handleCreateUnregisteredEntity_event} >Create new unregistered entity</CustomButton></div>
            <br/>
            <h2>Current Entity</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <ContentBlock title="Current">
                <TableHorizontal
                    tableContentState={{
						tableContent: currentEntity,
						setTableContent: setCurrentEntity
					}}
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