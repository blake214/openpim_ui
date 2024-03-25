"use client"

import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";
import { keyDictionary_languages } from "@/lib/key_dictionary";

export default function EditProductNames({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content);
    const [currentNames, setCurrentNames] = useState(content.map(element => ({
        checked: false,
        items: [
            {
                title: "Name",
                content: [element.name]
            },
            {
                title: "Language",
                content: [keyDictionary_languages[element.language_id]]
            }
        ]
    })));
    // Add form states
    const [addName, setAddName] = useState("");
    const [addLanguage, setAddLanguage] = useState("AAOA");
    // ======= States

    // ======= Change Handlers
    const handleChangeAddFormData = (event) => {
        const { name, value } = event.target;
        if(name == "name") setAddName(value);
        if(name == "language") setAddLanguage(value);
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleDeleteFormData = (event) => {
        event.preventDefault();
        // Initialise the update
        let new_local_storage_data = []
        let new_current_names = []
        // Check which values are checked
        currentNames.forEach((element, index) => {
            if(!element.checked) {
                new_local_storage_data.push(localStorageData[index])
                new_current_names.push(currentNames[index])
            }
        });
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentNames(new_current_names)
    }
    const handleMoveUpFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentNames.forEach((element, index) => {
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
        let new_current_names = [...currentNames]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const prev_local_value = localStorageData[selected_indicies - 1]
        const current_current_value = currentNames[selected_indicies]
        const prev_current_value = currentNames[selected_indicies - 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = prev_local_value
        new_local_storage_data[selected_indicies - 1] = current_local_value
        new_current_names[selected_indicies] = prev_current_value
        new_current_names[selected_indicies - 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentNames(new_current_names)
    }
    const handleMoveDownFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentNames.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Make sure there is not at the bottom of the list already
        if(selected_indicies == currentNames.length - 1) return
        // ======= States
        // Create the working list
        let new_local_storage_data = [...localStorageData]
        let new_current_names = [...currentNames]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const next_value_staged_files = localStorageData[selected_indicies + 1]
        const current_current_value = currentNames[selected_indicies]
        const next_value_current_staged_files = currentNames[selected_indicies + 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = next_value_staged_files
        new_local_storage_data[selected_indicies + 1] = current_local_value
        new_current_names[selected_indicies] = next_value_current_staged_files
        new_current_names[selected_indicies + 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentNames(new_current_names)
    }
    const handleAdd = (event) => {
        event.preventDefault();
        // Check element doesnt already exist
        if(localStorageData.some(element => element.language_id == addLanguage)) return
        // Initialise
        let new_local_storage_data = [...localStorageData]
        let new_current_names = [...currentNames]
        // Update new record
        new_local_storage_data.push({
            name: addName,
            language_id: addLanguage
        })
        new_current_names.push({
            checked: false,
            items: [
                {
                    title: "Name",
                    content: [addName]
                },
                {
                    title: "Language",
                    content: [keyDictionary_languages[addLanguage]]
                }
            ]
        })
        // Update states
        setLocalStorageData(new_local_storage_data)
        setCurrentNames(new_current_names)
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
            <h1>Edit Product Names</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <form onSubmit={handleAdd}>
                <ContentBlock title="Add Name">
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Name",
                                        content: [
                                            <input type="text" name="name" value={addName} onChange={handleChangeAddFormData} placeholder="..." required/>
                                        ]
                                    },
                                    {
                                        title: "Language",
                                        content: [
                                            <select name="language" value={addLanguage} onChange={handleChangeAddFormData} required>
                                                { Object.entries(keyDictionary_languages).map(element => {
                                                    return <option key={element[0]} value={element[0]}>{keyDictionary_languages[element[0]]}</option>
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
            <h2>Current Names</h2>
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
						tableContent: currentNames,
						setTableContent: setCurrentNames
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