"use client"

import { db } from '@/models/db';
import { buildContent, cleanLocalStorageChildrenKeys } from '@/lib/helpers';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { keyDictionary } from '@/lib/key_dictionary';
import { handleLogout } from '@/lib/action';
import CustomButton from '@/components/custom_button/custom_button';
import TableHorizontal from '@/components/table_horizontal/table_horizontal';
import SectionBlockMinimizer from '@/components/section_block_minimizer/section_block_minimizer';
import ContentBlock from '@/components/content_block/content_block';

export default function CreatePdfPage({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const { data: session, status } = useSession()
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp, "content")
    // ======= General

    // ======= States
    const [createPdfData, setCreatePdfData] = useState()
    const [stagedFiles, setStagedFiles] = useState([]);
    // ======= States
    
    // ======= Event Handlers
    const handleCreatePdfSubmit = async (e) => {
        e.preventDefault();
        // Check there is one file available
        if(!stagedFiles.length) return alert("You need to add a file")
        const one_file = stagedFiles[0]
        // Create multipart form data
        const formData = new FormData();
        formData.append('alt_text', content.alt_text);
        formData.append('description', content.description);
        formData.append('language_id', content.language_id);
        formData.append('pdf', one_file.file, one_file.name);
        // Perform request
        fetch(`${process.env.NEXT_PUBLIC_OPENPIM_API_URL}pdf`, {
            method: 'POST',
            headers: {
                'Authorization': session?.user?.openPimToken,
            },
            body: formData
        }).then(response => {
            return response.json();
        }).then(response => {
            // Check if there was an error
            if(response.errors) {
                // Logout if a 401 error
                response.errors.map(error => {
                    if(error.statusCode == 401) handleLogout()
                })
                const errorMessage = response.errors.map(({ message }) => message).join(', ');
                alert(errorMessage)
            } else if(response.data) {
                setCreatePdfData(response.data.pdf_id)
            }
        })
    }
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        // On success, change itself into the response
        if(createPdfData){
            // Replace the local variable with the id
            localStorage?.setItem(lastRoute, JSON.stringify({
                type: "edit",
                sub_type: "pdf_id",
                title: "pdf",
                content: createPdfData
            }));
            // Clean the local storage
            cleanLocalStorageChildrenKeys(lastRoute)
            // Clean the DB
            db.clearList(content.files_id)
            // Go back to prev route
            router.push(prevRoute)
        }
    }, [createPdfData]);
    useEffect(() => {
        // Get the files in the database
        db.files.where('key').equals(content.files_id).toArray().then(result => {
            // Sort the result
            result.sort((a, b) => (a.no - b.no));
            setStagedFiles(result)
        })
    }, [])
    // ======= Effects

    return (
        <div>
            <h1>Create Pdf</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <h2>General Info</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Current Files" start_state="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.files_id}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={stagedFiles.map(element => ({
                            checked: false,
                            items: [
                                {
                                    title: "File Name",
                                    content: [element.name]
                                }
                            ]
                        }))}
                        numbers={true}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <h2>Meta Info</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Alternative Text" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.alt_text}`)
                    }}
                >
                    <TableHorizontal
                        tableContent= {[
                            {
                                checked: false,
                                items: [
                                    {
                                        title: "Alternative Text",
                                        content: [content.alt_text]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Description" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.description}`)
                    }}
                >
                    <TableHorizontal
                        tableContent= {[
                            {
                                checked: false,
                                items: [
                                    {
                                        title: "Description",
                                        content: [content.description]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Language" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.language_id}`)
                    }}
                >
                    <TableHorizontal
                        tableContent= {[
                            {
                                checked: false,
                                items: [
                                    {
                                        title: "Language",
                                        content: [keyDictionary[content.language_id]]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="button_fixed_width align_right">
                <CustomButton component_type="vertical" onClick={handleCreatePdfSubmit} >Submit</CustomButton>
            </div>
        </div>
    );
}


// internalServer -> origin: uploadPdfTransaction, message: Error: Failed to parse PDF document (line:352 col:4694 offset=54699): No PDF header found
