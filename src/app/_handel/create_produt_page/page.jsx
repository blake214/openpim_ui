"use client"

import { buildContent, cleanLocalStorageChildrenKeys } from '@/lib/helpers';
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client';
import { CreateTempProduct } from '@/lib/graphql_mutation';
import { useEffect } from 'react';
import { keyDictionary_languages, keyDictionary_product_packaging } from '@/lib/key_dictionary';
import SectionBlockMinimizer from '@/components/section_block_minimizer/section_block_minimizer';
import ContentBlock from '@/components/content_block/content_block';
import TableHorizontal from '@/components/table_horizontal/table_horizontal';
import CustomButton from '@/components/custom_button/custom_button';

export default function CreateProductPage({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp, "content")
    // ======= General

    // ======= GraphQL
    const [createTempProduct, { data: createTempProductData, loading: createTempProductLoading, error: createTempProductError }] = useMutation(CreateTempProduct);
    // ======= GraphQL

    // ======= Event Handlers
    const handleSubmit = (event) => {
        event.preventDefault();
        /** Clean data */
        const cleaned_content = {
            ...(content.series.length && { series: content.series }),
            names: content.names,
            title: content.title,
            description: content.description,
            summary: content.summary,
            packaging: content.packaging,
            entity_id: content.entity_id,
        }
        /** Verify data */
        if(!content.title.short.length) alert("You need titles")
        /** Perform the request */
        createTempProduct({
            variables: {
                CreateTempProductInputObject: cleaned_content
            }
        })
    }
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        if(createTempProductData) {
            // Replace the local variable with the id
            localStorage?.setItem(lastRoute, JSON.stringify({
                type: "edit",
                sub_type: "product_id",
                title: "product",
                content: createTempProductData.createTempProduct.temp_product_id
            }));
            // Clean the local storage
            cleanLocalStorageChildrenKeys(lastRoute)
            // Go back to prev route
            router.push(prevRoute)
        }
    }, [createTempProductData]);
    // ======= Effects

    return (
        <div>
            <h1>Create New Product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <h2>Product Info</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Title" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.title}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Short",
                                        content: [content.title.short]
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        title: "Long",
                                        content: [content.title.long]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Names" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.names}`)
                    }}
                >
                    <TableHorizontal
                        numbers={true}
                        tableContent={content.names.map(element => ({
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
                        }))}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Entity" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.entity_id}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Entity Id",
                                        content: [content.entity_id]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Series" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.series}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Series",
                                        content: [content.series]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <h2>Supporting Info</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
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
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Short",
                                        content: [content.description.short]
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        title: "Long",
                                        content: [content.description.long]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Summary" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.summary}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Short",
                                        content: [content.summary.short]
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        title: "Long",
                                        content: [content.summary.long]
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Packaging" start_state="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.packaging}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={[
                            {
                                items: [
                                    {
                                        title: "Packaging Type",
                                        content: [keyDictionary_product_packaging[content.packaging.packaging_type]]
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        title: "width",
                                        content: [content.packaging.width]
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        title: "height",
                                        content: [content.packaging.height]
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        title: "depth",
                                        content: [content.packaging.depth]
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        title: "weight",
                                        content: [content.packaging.weight]
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
                <CustomButton component_type="vertical" onClick={handleSubmit} disabled={createTempProductLoading}>Submit</CustomButton>
            </div>
        </div>
    );
}
