"use client"

import { buildContent, cleanLocalStorageChildrenKeys } from '@/lib/helpers';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { keyDictionary_languages } from '@/lib/key_dictionary';
import { handleLogout } from '@/lib/action_server';
import CustomButton from '@/components/custom_button/custom_button';
import TableHorizontal from '@/components/table_horizontal/table_horizontal';
import SectionBlockMinimizer from '@/components/section_block_minimizer/section_block_minimizer';
import ContentBlock from '@/components/content_block/content_block';

export default function CreateVideoPage({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const { data: session, status } = useSession()
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp, "content")
    // ======= General

    // ======= States
    const [createVideoData, setCreateVideoData] = useState()
    const [createVideoDataBusy, setCreateVideoDataBusy] = useState(false);
    // ======= States
    
    // ======= Event Handlers
    const handleSubmit = async (event) => {
        event.preventDefault();
        /** Verify data */
        // Check general
        if(!content.external_url.length) return alert("You need to provide a url link")
        if(!content.alt_text.length) return alert("You need to provide an alternative text")
        if(!content.description.length) return alert("You need to provide an description")
        // Check url
        const validRegex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
        if(!validRegex.test(content.external_url)) return alert("Your url needs to be in a full 'https://www.example.com' format")
        /** Create multipart form data */
        const formData = new FormData();
        formData.append('external_url', content.external_url);
        formData.append('alt_text', content.alt_text);
        formData.append('description', content.description);
        formData.append('loopable', content.loopable);
        formData.append('language_id', content.language_id);
        /** Perform the request */
        // Set is loading
        setCreateVideoDataBusy(true)
        fetch(`${process.env.NEXT_PUBLIC_OPENPIM_API_URL}video`, {
            method: 'POST',
            headers: {
                'Authorization': session?.user?.openPimToken,
            },
            body: formData
        }).then(response => {
            setCreateVideoDataBusy(false)
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
                setCreateVideoData(response.data.video_id)
            }
        }).catch(err => {
            setCreateVideoDataBusy(false)
            alert(err)
        })
    }
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        // On success, change itself into the response
        if(createVideoData){
            // Replace the local variable with the id
            localStorage?.setItem(lastRoute, JSON.stringify({
                type: "edit",
                sub_type: "video_id",
                title: "video",
                content: createVideoData
            }));
            // Clean the local storage
            cleanLocalStorageChildrenKeys(lastRoute)
            // Go back to prev route
            router.push(prevRoute)
        }
    }, [createVideoData]);
    // ======= Effects

    return (
        <div>
            <h1>Create Video</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <h2>General Info</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Current Url" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.external_url}`)
                    }}
                >
                    <TableHorizontal
                        tableContent= {[
                            {
                                items: [
                                    {
                                        title: "Url",
                                        content: [content.external_url]
                                    }
                                ]
                            }
                        ]}
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
            <SectionBlockMinimizer heading="Loopable" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.loopable}`)
                    }}
                >
                    <TableHorizontal
                        tableContent= {[
                            {
                                items: [
                                    {
                                        title: "Loopable",
                                        content: [
                                            <input type='checkbox' checked={content.loopable} disabled/>
                                        ]
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
                                items: [
                                    {
                                        title: "Language",
                                        content: [keyDictionary_languages[content.language_id]]
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
                <CustomButton component_type="vertical" onClick={handleSubmit} disabled={createVideoDataBusy} busy={createVideoDataBusy}>Submit</CustomButton>
            </div>
        </div>
    );
}
