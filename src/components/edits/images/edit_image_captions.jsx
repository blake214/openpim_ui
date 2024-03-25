"use client"

import { db } from "@/models/db";
import { buildContent, isLocalUuidKey } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { handleCreateImage } from "@/lib/action_user";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";
import CoordinatePickerBlock from "@/components/custom_image/coordinate_picker_block";

export default function EditImageCaptions({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const form_data = stored_element_temp.form_data
    const content = buildContent(stored_element_temp)
    const file_database_table_id = stored_element.extra
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content);
    const [previewFile, setPreviewFile] = useState();
    const [previewFileDimensions, setPreviewFileDimensions] = useState({
        width:0,
        height:0
    });
    const [currentCaptions, setCurrentCaptions] = useState(content.map(element => ({
        checked: false,
        items: [
            {
                title: "Caption Content",
                content: [element.content]
            },
            {
                title: "Image",
                content: [element.caption_image_id]
            },
            {
                title: "Co-Ordinates",
                content: [
                    `${element.co_ordinates.x_axis}px (x)`,
                    `${element.co_ordinates.y_axis}px (y)`
                ]
            }
        ]
    })));
    // Add form states
    const [addCaptionImage, setAddCaptionImage] = useState("");
    const [addCaptionContent, setAddCaptionContent] = useState("");
    const [addCaptionCoordinates, setAddCaptionCoordinates] = useState({
        x_axis:0,
        y_axis:0
    });
    // ======= States

    // ======= Change Handlers
    const handleChangeAddFormData = (event) => {
        const { name, value } = event.target;
        if(name == "caption_content") setAddCaptionContent(value);
        if(name == "x_axis") setAddCaptionCoordinates(prevData => ({
            ...prevData,
            x_axis: value
        }));
        if(name == "y_axis") setAddCaptionCoordinates(prevData => ({
            ...prevData,
            y_axis: value
        }));
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleCreateImage_event = (event) => {
        event.preventDefault();
        // Create an object
        const image_id = handleCreateImage()
        // Update the storage to point to the new object
        localStorage?.setItem(lastRoute, JSON.stringify({
            ...stored_element,
            content: localStorageData,
            form_data: {
                addCaptionImage: image_id,
                addCaptionContent: addCaptionContent,
                addCaptionCoordinates: addCaptionCoordinates
            }
        }));
        // Route to edit that object
        router.push(`${location}/${image_id}`)
    }
    const handleDeleteFormData = (event) => {
        event.preventDefault();
        // Initialise the update
        let new_local_storage_data = []
        let new_current_captions = []
        // Check which values are checked
        currentCaptions.forEach((element, index) => {
            if(!element.checked) {
                new_local_storage_data.push(localStorageData[index])
                new_current_captions.push(currentCaptions[index])
            }
        });
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_captions)
    }
    const handleMoveUpFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentCaptions.forEach((element, index) => {
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
        let new_current_captions = [...currentCaptions]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const prev_local_value = localStorageData[selected_indicies - 1]
        const current_current_value = currentCaptions[selected_indicies]
        const prev_current_value = currentCaptions[selected_indicies - 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = prev_local_value
        new_local_storage_data[selected_indicies - 1] = current_local_value
        new_current_captions[selected_indicies] = prev_current_value
        new_current_captions[selected_indicies - 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_captions)
    }
    const handleMoveDownFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentCaptions.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Make sure there is not at the bottom of the list already
        if(selected_indicies == currentCaptions.length - 1) return
        // ======= States
        // Create the working list
        let new_local_storage_data = [...localStorageData]
        let new_current_captions = [...currentCaptions]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const next_value_staged_files = localStorageData[selected_indicies + 1]
        const current_current_value = currentCaptions[selected_indicies]
        const next_value_current_staged_files = currentCaptions[selected_indicies + 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = next_value_staged_files
        new_local_storage_data[selected_indicies + 1] = current_local_value
        new_current_captions[selected_indicies] = next_value_current_staged_files
        new_current_captions[selected_indicies + 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_captions)
    }
    const handleAdd = (event) => {
        event.preventDefault();
        // Initialise
        let new_local_storage_data = [...localStorageData]
        let new_current_captions = [...currentCaptions]
        // Update new record
        new_local_storage_data.push({
            ...(addCaptionImage.length ? { caption_image_id: addCaptionImage } : { caption_image_id: null }),
            content: addCaptionContent,
            co_ordinates: addCaptionCoordinates
        })
        new_current_captions.push({
            checked: false,
            items: [
                {
                    title: "Caption Content",
                    content: [addCaptionContent]
                },
                {
                    title: "Image",
                    content: [addCaptionImage]
                },
                {
                    title: "Co-Ordinates",
                    content: [
                        `${addCaptionCoordinates.x_axis}px (x)`,
                        `${addCaptionCoordinates.y_axis}px (y)`
                    ]
                }
            ]
        })
        // Update states
        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_captions)
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
        // Load the preview image if it exists in the indexDB
        if(file_database_table_id) {
            // Get the files in the database
            db.files.where('key').equals(file_database_table_id).toArray().then(result => {
                // Sort the result
                result.sort((a, b) => (a.no - b.no));
                // Set preview
                if(result.length) {
                    // Get the first file
                    const blob = result[0].file
                    const imageUrl = URL.createObjectURL(blob);
                    setPreviewFile(imageUrl)
                    // Lets get image dimensions for the form input restrictions
                    const image = new Image();
                    image.onload = () => {
                        setPreviewFileDimensions({
                            width:image.width,
                            height:image.height
                        })
                    };
                    image.src = imageUrl
                }
            })
        }
        // Check if there is persistent form data
        if(form_data) {
            // Check if addCaptionImage exits and is a ID
            if(form_data.addCaptionImage && isLocalUuidKey(form_data.addCaptionImage)) {
                // Lets get the record from local storage
                let persistent_addCaptionImage = localStorage?.getItem(form_data.addCaptionImage);
                if(persistent_addCaptionImage) {
                    // As its stored in a string lets parse it
                    persistent_addCaptionImage = JSON.parse(persistent_addCaptionImage)
                    // Lets check if its a complete object
                    if(persistent_addCaptionImage.sub_type == "image_id") {
                        setAddCaptionImage(persistent_addCaptionImage.content)
                    }
                }
            }
            // Check if addCaptionContent exits
            if(form_data.addCaptionContent) setAddCaptionContent(form_data.addCaptionContent)
            // Check if addCaptionCoordinates
            if(form_data.addCaptionCoordinates) setAddCaptionCoordinates(form_data.addCaptionCoordinates)
        }
    }, [])
    // ======= Effects
    
	return (
		<>
            <h1>Edit Captions</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <form onSubmit={handleAdd}>
                <ContentBlock title="Add Caption">
                    <CoordinatePickerBlock 
                        imageUrl={previewFile}
                        coordinate_state={{
                            coordinate:addCaptionCoordinates,
                            setCoordinate:setAddCaptionCoordinates
                        }}
                    />
                    <br/>
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Content",
                                        content: [
                                            <input type="text" name="caption_content" value={addCaptionContent} onChange={handleChangeAddFormData} placeholder="..." required/>
                                        ]
                                    },
                                    {
                                        title: "Image",
                                        content: [
                                            `${addCaptionImage}`,
                                            <CustomButton component_type="vertical" onClick={handleCreateImage_event}>Add Image</CustomButton>
                                        ]
                                    },
                                    {
                                        title: "Co-Ordinates",
                                        content: [
                                            <input type="number" name="x_axis" min={0} max={previewFileDimensions.width} value={addCaptionCoordinates.x_axis} onChange={handleChangeAddFormData} placeholder="..." required/>,
                                            <input type="number" name="y_axis" min={0} max={previewFileDimensions.height} value={addCaptionCoordinates.y_axis} onChange={handleChangeAddFormData} placeholder="..." required/>
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
            <h2>Current Captions</h2>
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
						tableContent: currentCaptions,
						setTableContent: setCurrentCaptions
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