"use client"

import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { keyDictionary_entity_types } from "@/lib/key_dictionary";
import CustomButton from "../../custom_button/custom_button";
import CustomTable from "@/components/custom_table/custom_table";
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
    const [currentEntityTypes, setCurrentEntityTypes] = useState(localStorageData.map(element => ({
        checked: false,
        items: [
            {
                title: "Entity Type",
                content: [keyDictionary_entity_types[element]]
            }
        ]
    })));
    // Add form states
    const [addEntityType, setAddEntityType] = useState("AAXA");
    // ======= States

    // ======= Change Handlers
    const handleChangeAddFormData = (event) => {
        const { name, value } = event.target;
        if(name == "entity_type") setAddEntityType(value);
    };
    // ======= Change Handlers

    // ======= Change Handlers
    const handleDeleteFormData = (event) => {
        event.preventDefault();
        // Initialise the update
        let new_local_storage_data = []
        let new_current_entity_types = []
        // Check which values are checked
        currentEntityTypes.forEach((element, index) => {
            if(!element.checked) {
                new_local_storage_data.push(localStorageData[index])
                new_current_entity_types.push(currentEntityTypes[index])
            }
        });
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentEntityTypes(new_current_entity_types)
    }
    const handleMoveUpFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentEntityTypes.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Make sure there is not at the top of the list already
        if(selected_indicies == 0) return
        // ======= States
        // Create the working list
        let new_local_storage_data = [...localStorageData]
        let new_current_entity_types = [...currentEntityTypes]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const prev_local_value = localStorageData[selected_indicies - 1]
        const current_current_value = currentEntityTypes[selected_indicies]
        const prev_current_value = currentEntityTypes[selected_indicies - 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = prev_local_value
        new_local_storage_data[selected_indicies - 1] = current_local_value
        new_current_entity_types[selected_indicies] = prev_current_value
        new_current_entity_types[selected_indicies - 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentEntityTypes(new_current_entity_types)
    }
    const handleMoveDownFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentEntityTypes.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Make sure there is not at the bottom of the list already
        if(selected_indicies == currentEntityTypes.length - 1) return
        // ======= States
        // Create the working list
        let new_local_storage_data = [...localStorageData]
        let new_current_entity_types = [...currentEntityTypes]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const next_value_staged_files = localStorageData[selected_indicies + 1]
        const current_current_value = currentEntityTypes[selected_indicies]
        const next_value_current_staged_files = currentEntityTypes[selected_indicies + 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = next_value_staged_files
        new_local_storage_data[selected_indicies + 1] = current_local_value
        new_current_entity_types[selected_indicies] = next_value_current_staged_files
        new_current_entity_types[selected_indicies + 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentEntityTypes(new_current_entity_types)
    }
    const handleAdd = (event) => {
        event.preventDefault();
        // Check element doesnt already exist
        if(localStorageData.includes(addEntityType)) return
        // Initialise
        let new_local_storage_data = [...localStorageData]
        let new_current_entity_types = [...currentEntityTypes]
        // Update new record
        new_local_storage_data.push(addEntityType)
        new_current_entity_types.push({
            checked: false,
            items: [
                {
                    title: "Entity Type",
                    content: [keyDictionary_entity_types[addEntityType]]
                }
            ]
        })
        // Update states
        setLocalStorageData(new_local_storage_data)
        setCurrentEntityTypes(new_current_entity_types)
    }
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
            <h1>Edit Entity Types</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <form onSubmit={handleAdd}>
                <ContentBlock title="Add Entity Type">
                    <CustomTable
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Entity Type",
                                        content: [
                                            <select name="entity_type" value={addEntityType} onChange={handleChangeAddFormData} required>
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
                        <CustomButton component_type="vertical" type="submit">Add</CustomButton>
                    </div>
                </div>
            </form>
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
                <CustomTable
					tableContentState={{
						tableContent: currentEntityTypes,
						setTableContent: setCurrentEntityTypes
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