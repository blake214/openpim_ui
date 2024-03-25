"use client"

import { db } from '@/models/db';
import { buildContent, cleanLocalStorageChildrenKeys } from '@/lib/helpers';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { handleLogout } from '@/lib/action_server';
import { useTheme } from "next-themes";
import styles from "../style.module.css";
import CustomButton from '@/components/custom_button/custom_button';
import TableHorizontal from '@/components/table_horizontal/table_horizontal';
import SectionBlockMinimizer from '@/components/section_block_minimizer/section_block_minimizer';
import ContentBlock from '@/components/content_block/content_block';
import ImageDarkmodeWrapper from '@/components/custom_image/image_darkmode_wrapper';
import CroppedImageCanvas from '@/components/custom_image/cropped_image_canvas';
import CaptionVisualiseBlock from '@/components/custom_image/caption_visualise_block';

export default function CreateImagePage({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const { data: session, status } = useSession()
    const { theme } = useTheme()
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp, "content")
    // ======= General

    // ======= States
    const [createImageData, setCreateImageData] = useState()
    const [stagedFiles, setStagedFiles] = useState([]);
    const [previewFile, setPreviewFile] = useState();
    const [croppingsNotZeros, setCroppingsNotZeros] = useState(false);
    const [createImageDataBusy, setCreateImageDataBusy] = useState(false);
    // ======= States
    
    // ======= Event Handlers
    const handleSubmit = async (event) => {
        event.preventDefault();
        /** Verify data */
        // Check there is one file available
        if(!stagedFiles.length) return alert("You need to add a file")
        const one_file = stagedFiles[0]
        // Check croppings has been done
        if( !content.croppings.version_sq.width ||
            !content.croppings.version_sq.height ||
            !content.croppings.version_rec1.width ||
            !content.croppings.version_rec1.height ||
            !content.croppings.version_rec2.width ||
            !content.croppings.version_rec2.height) alert("You need to assign cropping regions")
        // Check general
        if(!content.alt_text.length) return alert("You need to provide an alternative text")
        if(!content.description.length) return alert("You need to provide an description")
        /** Create multipart form data */
        const formData = new FormData();
        formData.append('croppings', JSON.stringify(content.croppings));
        formData.append('captions', JSON.stringify(content.captions));
        formData.append('alt_text', content.alt_text);
        formData.append('description', content.description);
        formData.append('image', one_file.file, one_file.name);
        /** Perform the request */
        // Set is loading
        setCreateImageDataBusy(true)
        fetch(`${process.env.NEXT_PUBLIC_OPENPIM_API_URL}image`, {
            method: 'POST',
            headers: {
                'Authorization': session?.user?.openPimToken,
            },
            body: formData
        }).then(response => {
            setCreateImageDataBusy(false)
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
                setCreateImageData(response.data.image_id)
            }
        }).catch(err => {
            setCreateImageDataBusy(false)
            alert(err)
        })
    }
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        // On success, change itself into the response
        if(createImageData){
            // Replace the local variable with the id
            localStorage?.setItem(lastRoute, JSON.stringify({
                type: "edit",
                sub_type: "image_id",
                title: "image",
                content: createImageData
            }));
            // Clean the local storage
            cleanLocalStorageChildrenKeys(lastRoute)
            // Clean the DB
            db.clearList(content.files_id)
            // Go back to prev route
            router.push(prevRoute)
        }
    }, [createImageData]);
    useEffect(() => {
        // Get the files in the database
        db.files.where('key').equals(content.files_id).toArray().then(result => {
            // Sort the result
            result.sort((a, b) => (a.no - b.no));
            setStagedFiles(result)
            // Set preview
            if(result.length) {
                // Get the first file
                const blob = result[0].file
                const imageUrl = URL.createObjectURL(blob);
                setPreviewFile(imageUrl)
            }
        })
        // Lets check if croppings arent zeros
        if( content.croppings.version_sq.width ||
            content.croppings.version_sq.height ||
            content.croppings.version_rec1.width ||
            content.croppings.version_rec1.height ||
            content.croppings.version_rec2.width ||
            content.croppings.version_rec2.height) {
                setCroppingsNotZeros(true)
            }
    }, [])
    // ======= Effects
    
    return (
        <div>
            <h1>Create Image</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <h2>General Info</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Current File" start_state="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.files_id}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={stagedFiles.map(element => ({
                            items: [
                                {
                                    title: "File Name",
                                    content: [element.name]
                                }
                            ]
                        }))}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <h2>Preview</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Preview 1:1" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                {previewFile && croppingsNotZeros &&
                    <div className={styles.container_border}>
                        {theme === "dark" ? (
                            <ImageDarkmodeWrapper>
                                <CaptionVisualiseBlock
                                    captions={content.captions}
                                    cropping = {content.croppings.version_sq}
                                >
                                    <CroppedImageCanvas imageUrl={previewFile} cropping = {content.croppings.version_sq}/>
                                </CaptionVisualiseBlock>
                            </ImageDarkmodeWrapper>
                        ) : (
                            <CaptionVisualiseBlock
                                captions={content.captions}
                                cropping = {content.croppings.version_sq}
                            >
                                <CroppedImageCanvas imageUrl={previewFile} cropping = {content.croppings.version_sq}/>
                            </CaptionVisualiseBlock>
                        )}
                    </div>
                }
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Preview 16:9" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                {previewFile && croppingsNotZeros &&
                    <div className={styles.container_border}>
                        {theme === "dark" ? (
                            <ImageDarkmodeWrapper>
                                <CaptionVisualiseBlock
                                    captions={content.captions}
                                    cropping = {content.croppings.version_rec1}
                                >
                                    <CroppedImageCanvas imageUrl={previewFile} cropping = {content.croppings.version_rec1}/>
                                </CaptionVisualiseBlock>
                            </ImageDarkmodeWrapper>
                        ) : (
                            <CaptionVisualiseBlock
                                captions={content.captions}
                                cropping = {content.croppings.version_rec1}
                            >
                                <CroppedImageCanvas imageUrl={previewFile} cropping = {content.croppings.version_rec1}/>
                            </CaptionVisualiseBlock>
                        )}
                    </div>
                }
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Preview 18:6" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                {previewFile && croppingsNotZeros &&
                    <div className={styles.container_border}>
                        {theme === "dark" ? (
                            <ImageDarkmodeWrapper>
                                <CaptionVisualiseBlock
                                    captions={content.captions}
                                    cropping = {content.croppings.version_rec2}
                                >
                                    <CroppedImageCanvas imageUrl={previewFile} cropping = {content.croppings.version_rec2}/>
                                </CaptionVisualiseBlock>
                            </ImageDarkmodeWrapper>
                        ) : (
                            <CaptionVisualiseBlock
                                captions={content.captions}
                                cropping = {content.croppings.version_rec2}
                            >
                                <CroppedImageCanvas imageUrl={previewFile} cropping = {content.croppings.version_rec2}/>
                            </CaptionVisualiseBlock>
                        )}
                    </div>
                }
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
            <h2>Additional</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Ratios" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.croppings}`)
                    }}
                >
                    <TableHorizontal
                        tableContent= {[
                            {
                                items: [
                                    {
                                        title: "Ratio 1:1",
                                        content: [
                                            <p>left : {content.croppings.version_sq.left}px</p>,
                                            <p>top : {content.croppings.version_sq.top}px</p>,
                                            <p>width : {content.croppings.version_sq.width}px</p>,
                                            <p>height : {content.croppings.version_sq.height}px</p>
                                        ]
                                    },
                                    {
                                        title: "Ratio 16:9",
                                        content: [
                                            <p>left : {content.croppings.version_rec1.left}px</p>,
                                            <p>top : {content.croppings.version_rec1.top}px</p>,
                                            <p>width : {content.croppings.version_rec1.width}px</p>,
                                            <p>height : {content.croppings.version_rec1.height}px</p>
                                        ]
                                    },
                                    {
                                        title: "Ratio 18:6",
                                        content: [
                                            <p>left : {content.croppings.version_rec2.left}px</p>,
                                            <p>top : {content.croppings.version_rec2.top}px</p>,
                                            <p>width : {content.croppings.version_rec2.width}px</p>,
                                            <p>height : {content.croppings.version_rec2.height}px</p>
                                        ]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="captions" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.captions}`)
                    }}
                >
                    <TableHorizontal
                        numbers={true}
                        tableContent= {content.captions.map(element => ({
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
                        }))}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="button_fixed_width align_right">
                <CustomButton component_type="vertical" onClick={handleSubmit} disabled={createImageDataBusy} busy={createImageDataBusy}>Submit</CustomButton>
            </div>
        </div>
    );
}