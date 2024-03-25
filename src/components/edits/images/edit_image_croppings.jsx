"use client"

import { db } from "@/models/db";
import { buildContent } from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import CustomButton from "../../custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";
import ContentBlock from "@/components/content_block/content_block";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import RatioPickerBlock from "@/components/custom_image/ratio_picker_block";

export default function EditImageCroppings({stored_element, location, lastRoute, prevRoute}) {
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
    const [cropVersionSq, setCropVersionSq] = useState(localStorageData.version_sq);
    const [cropVersionRec1, setCropVersionRec1] = useState(localStorageData.version_rec1);
    const [cropVersionRec2, setCropVersionRec2] = useState(localStorageData.version_rec2);
    // ======= States

    // ======= Event Handlers
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

    // ======= Effects
    useEffect(() => {
        if(file_database_table_id) {
            // Get the files in the database
            db.files.where('key').equals(file_database_table_id).toArray().then(result => {
                // Sort the result
                result.sort((a, b) => (a.no - b.no));
                // Set the preview
                if(result.length) {
                    const blob = result[0].file
                    const imageUrl = URL.createObjectURL(blob);
                    setPreviewFile(imageUrl)
                }
            })
        }
    }, [])
    useEffect(() => {
        setLocalStorageData({
            version_sq: cropVersionSq,
            version_rec1: cropVersionRec1,
            version_rec2: cropVersionRec2
        })
    }, [cropVersionSq, cropVersionRec1, cropVersionRec2]);
    useEffect(() => {
        if(previewFile) {
            // If the initial values are ZEROs we will auto fit (we can use this for the first load)
            if( !cropVersionSq.width || 
                !cropVersionSq.height || 
                !cropVersionRec1.width || 
                !cropVersionRec1.height || 
                !cropVersionRec2.width || 
                !cropVersionRec2.height) {
                const image = new Image
                image.src = previewFile
                image.onload = () => {
                    // ==== version sq
                    const ratio_sq = 1
                    const desired_height_sq = image.width / ratio_sq
                    const desired_width_sq = image.height * ratio_sq
                    if(desired_height_sq <= image.height) {
                        setCropVersionSq({
                            left: 0,
                            top: parseInt((image.height - desired_height_sq) / 2),
                            width: parseInt(desired_height_sq*ratio_sq),
                            height: parseInt(desired_height_sq)
                        })
                    } else {
                        setCropVersionSq({
                            left: parseInt((image.width - desired_width_sq) / 2),
                            top: 0,
                            width: parseInt(desired_width_sq),
                            height: parseInt(desired_width_sq / ratio_sq)
                        })
                    }
                    // ==== version sq

                    // ==== version rec1
                    const ratio_rec1 = 1.777777777
                    const desired_height_rec1 = image.width / ratio_rec1
                    const desired_width_rec1 = image.height * ratio_rec1
                    if(desired_height_rec1 <= image.height) {
                        setCropVersionRec1({
                            left: 0,
                            top: parseInt((image.height - desired_height_rec1) / 2),
                            width: parseInt(desired_height_rec1*ratio_rec1),
                            height: parseInt(desired_height_rec1)
                        })
                    } else {
                        setCropVersionRec1({
                            left: parseInt((image.width - desired_width_rec1) / 2),
                            top: 0,
                            width: parseInt(desired_width_rec1),
                            height: parseInt(desired_width_rec1 / ratio_rec1)
                        })
                    }
                    // ==== version rec1

                    // ==== version rec2
                    const ratio_rec2 = 3
                    const desired_height_rec2 = image.width / ratio_rec2
                    const desired_width_rec2 = image.height * ratio_rec2
                    if(desired_height_rec2 <= image.height) {
                        setCropVersionRec2({
                            left: 0,
                            top: parseInt((image.height - desired_height_rec2) / 2),
                            width: parseInt(desired_height_rec2*ratio_rec2),
                            height: parseInt(desired_height_rec2)
                        })
                    } else {
                        setCropVersionRec2({
                            left: parseInt((image.width - desired_width_rec2) / 2),
                            top: 0,
                            width: parseInt(desired_width_rec2),
                            height: parseInt(desired_width_rec2 / ratio_rec2)
                        })
                    }
                    // ==== version rec2
                };
            }
        }
    }, [previewFile])
    // ======= Effects    
    
	return (
		<>
            <h1>Edit Ratios</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <BasicLink>Findout more</BasicLink>
            <br/>
            <SectionBlockMinimizer heading="Ratio 1:1" start_state="true">
                <ContentBlock title="Current">
                    <RatioPickerBlock
                        imageUrl={previewFile}
                        ratio={1}
                        crop_state={{
                            crop: cropVersionSq,
                            setCrop: setCropVersionSq,
                        }}>
                    </RatioPickerBlock>
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Ratio 16:9" start_state="true">
                <ContentBlock title="Current">
                    <RatioPickerBlock
                        imageUrl={previewFile}
                        ratio={1.777777}
                        crop_state={{
                            crop: cropVersionRec1,
                            setCrop: setCropVersionRec1,
                        }}>
                    </RatioPickerBlock>
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Ratio 18:6" start_state="true">
                <ContentBlock title="Current">
                    <RatioPickerBlock
                        imageUrl={previewFile}
                        ratio={3}
                        crop_state={{
                            crop: cropVersionRec2,
                            setCrop: setCropVersionRec2,
                        }}>
                    </RatioPickerBlock>
                </ContentBlock>
            </SectionBlockMinimizer>
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