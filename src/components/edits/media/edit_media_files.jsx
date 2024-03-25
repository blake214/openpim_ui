"use client"

import { db } from "@/models/db";
import { buildContent, readFileAsBlob } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
import styles from "../style.module.css"
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";

export default function EditMediaFiles({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp)
    const file_input_ref = useRef(null);
    const multi_file_allowed = (stored_element.max_files > 1 || false)
    const file_types_allowed = stored_element.file_types || ["image/png"]
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content); // for consistency
    const [stagedFiles, setStagedFiles] = useState([]);
    const [currentStagedFiles, setCurrentStagedFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    // ======= States

    // ======= Change Handlers
    // handle drag events
    const handleFileDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") setDragActive(true);
        else if (event.type === "dragleave") setDragActive(false);
    };
    // triggers when file is dropped
    const handleFileDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer?.files?.length) handelStagedFilesChange(event.dataTransfer.files);
    };
    // triggers when file is selected with click
    const handleFileInputChange = (event) => {
        event.preventDefault();
        if (event.target.files?.length) handelStagedFilesChange(event.target.files);
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleDeleteFormData = (event) => {
        event.preventDefault();
        // Initialise the update
        let new_staged_files = []
        let new_current_staged_files = []
        // Check which values are checked
        currentStagedFiles.forEach((element, index) => {
            if(!element.checked) {
                new_staged_files.push(stagedFiles[index])
                new_current_staged_files.push(currentStagedFiles[index])
            }
        });
        // Updates
        setStagedFiles(new_staged_files)
        setCurrentStagedFiles(new_current_staged_files)
    }
    const handleMoveUpFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentStagedFiles.forEach((element, index) => {
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
        let new_staged_files = [...stagedFiles]
        let new_current_staged_files = [...currentStagedFiles]
        // Record the elements we swapping
        const current_value_staged_files = stagedFiles[selected_indicies]
        const prev_value_staged_files = stagedFiles[selected_indicies - 1]
        const current_value_current_staged_files = currentStagedFiles[selected_indicies]
        const prev_value_current_staged_files = currentStagedFiles[selected_indicies - 1]
        // Swap elements
        new_staged_files[selected_indicies] = prev_value_staged_files
        new_staged_files[selected_indicies - 1] = current_value_staged_files
        new_current_staged_files[selected_indicies] = prev_value_current_staged_files
        new_current_staged_files[selected_indicies - 1] = current_value_current_staged_files
        // ======= States
        // Updates
        setStagedFiles(new_staged_files)
        setCurrentStagedFiles(new_current_staged_files)
    }
    const handleMoveDownFormData = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentStagedFiles.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Make sure there is not at the bottom of the list already
        if(selected_indicies == currentStagedFiles.length - 1) return
        // ======= States
        // Create the working list
        let new_staged_files = [...stagedFiles]
        let new_current_staged_files = [...currentStagedFiles]
        // Record the elements we swapping
        const current_value_staged_files = stagedFiles[selected_indicies]
        const next_value_staged_files = stagedFiles[selected_indicies + 1]
        const current_value_current_staged_files = currentStagedFiles[selected_indicies]
        const next_value_current_staged_files = currentStagedFiles[selected_indicies + 1]
        // Swap elements
        new_staged_files[selected_indicies] = next_value_staged_files
        new_staged_files[selected_indicies + 1] = current_value_staged_files
        new_current_staged_files[selected_indicies] = next_value_current_staged_files
        new_current_staged_files[selected_indicies + 1] = current_value_current_staged_files
        // ======= States
        // Updates
        setStagedFiles(new_staged_files)
        setCurrentStagedFiles(new_current_staged_files)
    }
    const handelStagedFilesChange = async (files) => {
        // Initialise
        let new_staged_files = [...stagedFiles]
        let new_current_staged_files = [...currentStagedFiles]
        // Turn that into an array (its not really an array)
        let files_array = Array.from(files)
        // Check if we allowed more than one file
        if(files_array.length && !multi_file_allowed) files_array = [files_array[0]]
        // Lets filter the file types that are allowed
        files_array = files_array.filter(element => file_types_allowed.includes(element.type));
        // Create an array of promises to convert the files into blobs and be ready for the DB
        const fileDataPromises = files_array.map(async (element) => {
            const file_contents = await readFileAsBlob(element);
            return {
                key: localStorageData,
                name: element.name,
                file: file_contents
            }
        })
        // Perform promises
        const data = await Promise.all(fileDataPromises);
        // Update new record
        new_staged_files = [
            ...(multi_file_allowed ? [...new_staged_files] : []), // Add to the staged state depending if more than one file allowed or not
            ...data
        ]
        new_current_staged_files = [
            ...(multi_file_allowed ? [...new_current_staged_files] : []), // Add to the staged state depending if more than one file allowed or not
            ...data.map(element => ({
                checked: false,
                items: [
                    {
                        title: "File Name",
                        content: [element.name]
                    }
                ]
            }))
        ]
        // Update states
        setStagedFiles(new_staged_files);
        setCurrentStagedFiles(new_current_staged_files)
        // Notify user
        alert("Number of files added: " + files_array.length);
    }
    const handleSave = async (event) => {
        event.preventDefault();
        // ======= IndexDB
        // Delete all existing files
        await db.clearList(localStorageData)
        // Add all the items to the DB
        if(stagedFiles.length) {
            // Do the no's
            const ordered_files = stagedFiles.map((element, index) => ({
                ...element,
                no: index
            }))
            // Add to indexDB
            await db.files.bulkAdd(ordered_files);
        }
        // ======= IndexDB
        // Go back to previous step
        router.push(prevRoute)
    }
    // triggers the input when the button is clicked
    const handleChooseFiles = (event) => {
        event.preventDefault();
        file_input_ref.current.click();
    };
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        if(localStorageData.length) {
            // Get the files in the database
            db.files.where('key').equals(localStorageData).toArray().then(result => {
                // Sort the result
                result.sort((a, b) => (a.no - b.no));
                setStagedFiles(result)
                setCurrentStagedFiles(result.map(element => ({
                    checked: false,
                    items: [
                        {
                            title: "File Name",
                            content: [element.name]
                        }
                    ]
                })))
            })
        }
    }, [])
    // ======= Effects

	return (
		<>
            <h1>Edit Files</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <form className={styles.form_file} onDragEnter={handleFileDrag}>
                <input className={styles.form_file_input} ref={file_input_ref} type="file" id="file_input" multiple={multi_file_allowed} onChange={handleFileInputChange} accept={file_types_allowed.join(', ')}/>
                <label htmlFor="file_input" 
                    className={`
                        ${styles.label_form_file_input}
                        ${dragActive && styles.drag_active}
                    `}
                >
                    <div>
                        <p>Drag and drop your files here...</p>
                        <br/>
                        <CustomButton align="center" component_type="vertical" onClick={handleChooseFiles}>Choose files</CustomButton>
                    </div> 
                </label>
                { dragActive && <div className={styles.drag_file_element} onDragEnter={handleFileDrag} onDragLeave={handleFileDrag} onDragOver={handleFileDrag} onDrop={handleFileDrop}></div> }
            </form>
            <br/>
            <div className="flex">
                <b>Allowed Formats</b>
                <b className="align_right">Maximum Size</b>
            </div>
            <hr className="hr_surface_color_1 hr_margin"/>
            {file_types_allowed.map(element => (
                <div key={element} className="flex">
                    <p>{element}</p>
                    <p className="align_right">5MB</p>
                </div>
            ))}
            <br/>
            <h2>Current Files</h2>
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
						tableContent: currentStagedFiles,
						setTableContent: setCurrentStagedFiles
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