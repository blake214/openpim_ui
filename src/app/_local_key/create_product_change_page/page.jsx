"use client"

import styles from "../style.module.css"
import ContentBlock from "@/components/content_block/content_block";
import CustomButton from "@/components/custom_button/custom_button";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import CustomTable from "@/components/custom_table/custom_table";
import { useRouter } from 'next/navigation'
import { buildContent, cleanLocalStorageChildrenKeys } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { CreateProductChange } from "@/lib/graphql_mutation";

export default function CreateProductChangePage({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const new_content = buildContent(stored_element_temp, "new_content")
    const existing_content = buildContent(stored_element_temp, "existing_content")
    // ======= General

    // ======= GraphQL
    const [createProductChange, { data: createProductChangeData, loading: createProductChangeLoading, error: createProductChangeError }] = useMutation(CreateProductChange);
    // ======= GraphQL

    // ======= States
    const [comment, setComment] = useState(stored_element.comment);
    // ======= States

    // ======= Change Handlers
    const handleCommentInputChange = (event) => {
        const { value } = event.target;
        setComment(value);
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleChangeSubmit = (event) => {
        event.preventDefault();
        /** Clean data */
        const cleaned_content = {
            product_id: stored_element.product_id,
            change_type: stored_element.change_type,
            new_object: new_content,
            ...(comment.length && { comment: comment })
        }
        /** Verify data */
        /** Perform request */
        createProductChange({
            variables: {
                CreateProductChangeInputObject: cleaned_content
            }
        })
    };
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        if(createProductChangeData) {
            // Clean the local storage
            cleanLocalStorageChildrenKeys(lastRoute)
            // Go back to prev route
            router.push(prevRoute)
        }
    }, [createProductChangeData]);
    // ======= Effects

    return (
        <div>
            <h1>Change Product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <SectionBlockMinimizer heading="Current" start_state="true">
                <p>This is the existing data that will be getting replaced.</p>
                <br/>
                <div className={styles.existing_content}>
                    {"title" in existing_content && 
                        <ContentBlock title="Current" >
                            <CustomTable
                                tableContent= {[
                                    {
                                        checked: false,
                                        items: [
                                            {
                                                title: "Short",
                                                content: [existing_content.title.short]
                                            },
                                            {
                                                title: "Long",
                                                content: [existing_content.title.long]
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </ContentBlock>
                    }
                </div>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="New" start_state="true">
                <p>This is the new data that will be replacing the existing.</p>
                <br/>
                <div className={styles.new_content}>
                    {"title" in new_content && 
                        <ContentBlock title="Current" editClick={() => {
                            router.push(`${location}/${stored_element.new_content.title}`)
                        }}>
                            <CustomTable
                                tableContent= {[
                                    {
                                        checked: false,
                                        items: [
                                            {
                                                title: "Short",
                                                content: [new_content.title.short]
                                            },
                                            {
                                                title: "Long",
                                                content: [new_content.title.long]
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </ContentBlock>
                    }
                </div>
            </SectionBlockMinimizer>
            <br/>
            <ContentBlock title="Change Comment">
                <textarea value={comment} onChange={handleCommentInputChange} placeholder="..."/>
            </ContentBlock>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="button_fixed_width align_right">
                <CustomButton component_type="vertical" onClick={handleChangeSubmit} disabled={createProductChangeLoading} busy={createProductChangeLoading}>Submit Change</CustomButton>
            </div>
        </div>
    );
}
