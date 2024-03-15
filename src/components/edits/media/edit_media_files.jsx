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
    // ======= General

    // ======= States
    const [localStorageData, setLocalStorageData] = useState(content);
    const [stagedFiles, setStagedFiles] = useState([]);
    const [currentStagedFiles, setCurrentStagedFiles] = useState([]);
    const [currentStagedFiles_changed, setCurrentStagedFiles_changed] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    // ======= States

    // ======= Change Handlers
    // handle drag events
    const handleFileDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    
    // triggers when file is dropped
    const handleFileDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Depending if more than one item is allowed
            if(multi_file_allowed) handelStagedFilesChange(e.dataTransfer.files);
            else handelStagedFilesChange([e.dataTransfer.files[0]]);
        }
    };
    
    // triggers when file is selected with click
    const handleFileInputChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handelStagedFilesChange(e.target.files);
        }
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handelStagedFilesChange = async (files) => {
        // Turn that into an array (its not really an array)
        const files_array = Array.from(files)
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
        // Add to the staged state depending if more than one file allowed or not
        setStagedFiles((prevData) => ([
            ...(multi_file_allowed ? [...prevData] : []),
            ...data
        ]));
        alert("Number of files added: " + files.length);
    }
    const handleDeleteFormData = (e) => {
        e.preventDefault();
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
    const handleMoveUpFormData = (e) => {
        e.preventDefault();
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
        setCurrentStagedFiles_changed(true)
    }
    const handleMoveDownFormData = (e) => {
        e.preventDefault();
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
        setCurrentStagedFiles_changed(true)
    }
    const handleSave = async () => {
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
            // Add to DB
            // await db.files.bulkAdd(stagedFiles);
            await db.files.bulkAdd(ordered_files);
        }
        // ======= IndexDB
        // Go back to previous step
        router.push(prevRoute)
    }
    // triggers the input when the button is clicked
    const handleChooseFiles = () => {
        file_input_ref.current.click();
    };
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        // Get the files in the database
        db.files.where('key').equals(localStorageData).toArray().then(result => {
            // Sort the result
            result.sort((a, b) => (a.no - b.no));
            setStagedFiles(result)
        })
    }, [])
    useEffect(() => {
        // This is so we dont uncheck our boxes when we move things, as we have already changed the current staged files
        if(currentStagedFiles_changed) return setCurrentStagedFiles_changed(false)
        // Update the current staged files
        setCurrentStagedFiles(stagedFiles.map(element => ({
            checked: false,
            items: [
                {
                    title: "File Name",
                    content: [element.name]
                }
            ]
        })))
    }, [stagedFiles])
    // ======= Effects

	return (
		<>
            <h1>Edit Media Files</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <form className={styles.form_file} onDragEnter={handleFileDrag} onSubmit={(e) => e.preventDefault()}>
                <input className={styles.form_file_input} ref={file_input_ref} type="file" id="file_input" multiple={multi_file_allowed} onChange={handleFileInputChange} />
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