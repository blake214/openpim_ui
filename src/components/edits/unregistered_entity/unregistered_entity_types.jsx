"use client"

import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { keyDictionary_entity_types } from "@/lib/key_dictionary";
import CustomButton from "../../custom_button/custom_button";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";

export default function EditUnregisteredEntityTypes({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content);
    const [addEntityType, setAddEntityType] = useState("AAXA");
    const [currentContentEntityTypes, setCurrentContentEntityTypes] = useState(localStorageData.map(element => ({
            checked: false,
            items: [
                {
                    title: "Entity Type",
                    content: [keyDictionary_entity_types[element]]
                }
            ]
        })));
    // ======= States

    // ======= Change Handlers
    const handleChangeAddFormData = (e) => {
        const { value } = e.target;
        setAddEntityType(value);
    };
    const handleDeleteFormData = () => {
        let new_value = []
        // Check which values are checked
        currentContentEntityTypes.forEach((element, index) => {
            if(!element.checked) new_value.push(localStorageData[index])
        });
        // Update the form
        setLocalStorageData(new_value)
        // Update the table contents
        setCurrentContentEntityTypes(new_value.map(element => ({
            checked: false,
            items: [
                {
                    title: "Entity Type",
                    content: [keyDictionary_entity_types[element]]
                }
            ]
        })))
    }
    const handleMoveUpFormData = () => {
        let selected_indicies = null
        // Check which values are checked
        currentContentEntityTypes.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected
        if(selected_indicies == null) return alert('Need to select an element')
        // Make sure there is not at the top of the list already
        if(selected_indicies == 0) return
        // Swap elements
        let new_value = [...localStorageData]
        const current_value = localStorageData[selected_indicies]
        const prev_value = localStorageData[selected_indicies - 1]
        new_value[selected_indicies] = prev_value
        new_value[selected_indicies - 1] = current_value
        // Update the form
        setLocalStorageData(new_value)
        // Update the table contents
        setCurrentContentEntityTypes(new_value.map(element => ({
            checked: false,
            items: [
                {
                    title: "Entity Type",
                    content: [keyDictionary_entity_types[element]]
                }
            ]
        })))
    }
    const handleMoveDownFormData = () => {
        let selected_indicies = null
        // Check which values are checked
        currentContentEntityTypes.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected
        if(selected_indicies == null) return alert('Need to select an element')
        // Make sure there is not at the top of the list already
        if(selected_indicies == localStorageData.length - 1) return
        // Swap elements
        let new_value = [...localStorageData]
        const current_value = localStorageData[selected_indicies]
        const next_value = localStorageData[selected_indicies + 1]
        new_value[selected_indicies] = next_value
        new_value[selected_indicies + 1] = current_value
        // Update the form
        setLocalStorageData(new_value)
        // Update the table contents
        setCurrentContentEntityTypes(new_value.map(element => ({
            checked: false,
            items: [
                {
                    title: "Entity Type",
                    content: [keyDictionary_entity_types[element]]
                }
            ]
        })))
    }
    // ======= Change Handlers

    // ======= Event Handlers
    const handleAdd = () => {
        // Check doesnt already exist
        if(localStorageData.includes(addEntityType)) return
        // Update new value
        let new_value = localStorageData
        new_value.push(addEntityType)
        setLocalStorageData(new_value)
        // Update the table contents
        setCurrentContentEntityTypes(new_value.map(element => ({
            checked: false,
            items: [
                {
                    title: "Entity Type",
                    content: [keyDictionary_entity_types[element]]
                }
            ]
        })))
    }
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
            <h1>Edit Entity Types</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <ContentBlock title="Add Entity Type">
                <TableHorizontal
					tableContent={[
                        {
                            items: [
                                {
                                    title: "Entity Type",
                                    content: [
                                        <select name="entity_type" value={addEntityType} onChange={handleChangeAddFormData}>
                                            { Object.entries(keyDictionary_entity_types).map(element => {
                                                return <option key={element[0]} value={element[0]}>{keyDictionary_entity_types[element[0]]}</option>
                                            })}
                                        </select>
                                    ]
                                }
                            ]
                        }
                    ]}
				/>
            </ContentBlock>
            <div className="flex">
                <div className={`button_fixed_width align_right`}>
                    <CustomButton component_type="vertical" onClick={handleAdd}>Add</CustomButton>
                </div>
            </div>
            <br/>
            <h2>Current Entity Types</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <ContentBlock 
                title="Current"
                menuComponents={
					<>
						<CustomButton component_type="vertical" onClick={handleDeleteFormData}>Delete</CustomButton>
                        <CustomButton component_type="vertical" onClick={handleMoveUpFormData}>Move Up</CustomButton>
                        <CustomButton component_type="vertical" onClick={handleMoveDownFormData}>Move Down</CustomButton>
					</>
				}
            >
                <TableHorizontal
					tableContentState={{
						tableContent: currentContentEntityTypes,
						setTableContent: setCurrentContentEntityTypes
					}}
                    checks={true}
                    numbers={true}
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