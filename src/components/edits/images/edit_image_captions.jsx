"use client"

import { db } from "@/models/db";
import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";
import CoordinatePickerBlock from "@/components/custom_image/coordinate_picker_block";

export default function EditImageCaptions({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    const file_database_table_id = stored_element.extra
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content);
    const [previewFile, setPreviewFile] = useState();
    const [stagedFiles, setStagedFiles] = useState([]);
    const [currentCaptions, setCurrentCaptions] = useState([]);
    const [currentCaptions_changed, setCurrentCaptions_changed] = useState(false);

    const [addCaptionImage, setAddCaptionImage] = useState(null);
    const [addCaptionContent, setAddCaptionContent] = useState("");
    const [addCaptionCoordinates, setAddCaptionCoordinates] = useState({
        x_axis:0,
        y_axis:0
    });
    
    // ======= States

    // ======= Event Handlers
    const handleDeleteFormData = (e) => {
        e.preventDefault();
        let new_local_storage_data = []
        let new_current_cations = []
        // Check which values are checked
        currentCaptions.forEach((element, index) => {
            if(!element.checked) {
                new_local_storage_data.push(localStorageData[index])
                new_current_cations.push(currentCaptions[index])
            }
        });
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_cations)
    }
    const handleMoveUpFormData = (e) => {
        e.preventDefault();
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
        let new_current_cations = [...currentCaptions]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const prev_local_value = localStorageData[selected_indicies - 1]
        const current_current_value = currentCaptions[selected_indicies]
        const prev_current_value = currentCaptions[selected_indicies - 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = prev_local_value
        new_local_storage_data[selected_indicies - 1] = current_local_value
        new_current_cations[selected_indicies] = prev_current_value
        new_current_cations[selected_indicies - 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_cations)
    }
    const handleMoveDownFormData = (e) => {
        e.preventDefault();
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
        let new_current_cations = [...currentCaptions]
        // Record the elements we swapping
        const current_local_value = localStorageData[selected_indicies]
        const next_value_staged_files = localStorageData[selected_indicies + 1]
        const current_current_value = currentCaptions[selected_indicies]
        const next_value_current_staged_files = currentCaptions[selected_indicies + 1]
        // Swap elements
        new_local_storage_data[selected_indicies] = next_value_staged_files
        new_local_storage_data[selected_indicies + 1] = current_local_value
        new_current_cations[selected_indicies] = next_value_current_staged_files
        new_current_cations[selected_indicies + 1] = current_current_value
        // ======= States
        // Updates
        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_cations)
    }
    const handelChangeAddCaptionContent = (e) => {
        const { value } = e.target;
        setAddCaptionContent(value);
    };
    const handleAdd = () => {
        let new_local_storage_data = [...localStorageData]
        let new_current_cations = [...currentCaptions]

        new_local_storage_data.push({
            caption_image_id: addCaptionImage,
            content: addCaptionContent,
            co_ordinates: addCaptionCoordinates
        })
        new_current_cations.push({
            checked: false,
            items: [
                {
                    title: "Caption Content",
                    content: [
                        addCaptionContent
                    ]
                },
                {
                    title: "Image",
                    content: [
                        addCaptionImage
                    ]
                },
                {
                    title: "Co-Ordinates",
                    content: [
                        <p>{addCaptionCoordinates.x_axis}px (x)</p>,
                        <p>{addCaptionCoordinates.y_axis}px (y)</p>
                    ]
                }
            ]
        })


        setLocalStorageData(new_local_storage_data)
        setCurrentCaptions(new_current_cations)
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

    // ======= Effects
    useEffect(() => {
        if(file_database_table_id) {
            // Get the files in the database
            db.files.where('key').equals(file_database_table_id).toArray().then(result => {
                // Sort the result
                result.sort((a, b) => (a.no - b.no));
                setStagedFiles(result)
            })
        }
    }, [])
    useEffect(() => {
        if(stagedFiles.length) {
            // Get the first file
            const blob = stagedFiles[0].file
            const imageUrl = URL.createObjectURL(blob);
            setPreviewFile(imageUrl)
        }
    }, [stagedFiles])
    useEffect(() => {
        setCurrentCaptions(content.map(element => ({
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
                        <p>{element.co_ordinates.x_axis}px (x)</p>,
                        <p>{element.co_ordinates.y_axis}px (y)</p>
                    ]
                }
            ]
        })))
    }, [])
    // ======= Effects
    
	return (
		<>
            <h1>Edit Captions</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <SectionBlockMinimizer heading="Preview" start_state="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
            </SectionBlockMinimizer>
            <br/>

            <CoordinatePickerBlock 
                imageUrl={previewFile}
                coordinate_state={{
                    coordinate:addCaptionCoordinates,
                    setCoordinate:setAddCaptionCoordinates
                }}
            />

            <ContentBlock title="Add Entity Type">
                <TableHorizontal
					tableContent={[
                        {
                            items: [
                                {
                                    title: "Caption Content",
                                    content: [
                                        <input type="text" name="caption_content" value={addCaptionContent} onChange={handelChangeAddCaptionContent} placeholder="..."/>
                                    ]
                                },
                                {
                                    title: "Image",
                                    content: [
                                        <p>{addCaptionImage}</p>,
                                        <CustomButton component_type="vertical">Add Image</CustomButton>
                                    ]
                                },
                                {
                                    title: "Co-Ordinates",
                                    content: [
                                        <p>{addCaptionCoordinates.x_axis}px (x)</p>,
                                        <p>{addCaptionCoordinates.y_axis}px (y)</p>
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