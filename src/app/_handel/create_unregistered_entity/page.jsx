"use client"

import { buildContent, cleanLocalStorageChildrenKeys } from '@/lib/helpers';
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client';
import { CreateUnregisteredEntity } from '@/lib/graphql_mutation';
import { useEffect } from 'react';
import { keyDictionary } from '@/lib/key_dictionary';
import CustomButton from '@/components/custom_button/custom_button';
import TableHorizontal from '@/components/table_horizontal/table_horizontal';
import SectionBlockMinimizer from '@/components/section_block_minimizer/section_block_minimizer';
import ContentBlock from '@/components/content_block/content_block';

export default function CreateUnregisteredEntityPage({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp, "content")
    // ======= General
    
    // ======= GraphQL
    const [createUnregisteredEntity, { data: createUnregisteredEntityData, loading: createUnregisteredEntityLoading, error: createUnregisteredEntityError }] = useMutation(CreateUnregisteredEntity);
    // ======= GraphQL
    
    // ======= Event Handlers
    const handleCreateUnregisteredEntitySubmit = (e) => {
        e.preventDefault();
        createUnregisteredEntity({
            variables: {
                CreateUnregisteredEntityInputObject: content
            }
        })
    }
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        // On success, change itself into the response
        if(createUnregisteredEntityData){
            // Replace the local variable with the id
            localStorage?.setItem(lastRoute, JSON.stringify({
                type: "edit",
                sub_type: "entity_id",
                title: "entity",
                content: createUnregisteredEntityData.createUnregisteredEntity._id
            }));
            // Clean the local storage
            cleanLocalStorageChildrenKeys(lastRoute)
            // Go back to prev route
            router.push(prevRoute)
        }
    }, [createUnregisteredEntityData]);
    // ======= Effects

    return (
        <div>
            <h1>Create Unregistered Entity</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <h2>Entity Info</h2>
            <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
            <SectionBlockMinimizer heading="Entity Types" start_state="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.entity_types}`)
                    }}
                >
                    <TableHorizontal
                        tableContent= {[
                            {
                                checked: false,
                                items: [
                                    {
                                        title: "Entity Types",
                                        content: content.entity_types.map(element => keyDictionary[element])
                                    }
                                ]
                            }
                        ]}
                    />
                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Entity Name" start_state="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>



                <ContentBlock
                    title="Current"
                    editClick={() => {
                        router.push(`${location}/${stored_element.content.entity_name}`)
                    }}
                >
                    <TableHorizontal
                        tableContent={[
                            {
                                checked: false,
                                items: [
                                    {
                                        title: "Entity Name",
                                        content: [content.entity_name]
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
                <CustomButton component_type="vertical" onClick={handleCreateUnregisteredEntitySubmit} disabled={createUnregisteredEntityLoading}>Submit</CustomButton>
            </div>
        </div>
    );
}
