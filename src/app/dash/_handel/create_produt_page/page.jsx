"use client"

import { buildContent } from '@/lib/helpers';
import { usePathname, useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client';
import { CreateTempProduct } from '@/lib/graphql_mutation';
import { useEffect } from 'react';
import CustomButton from '@/components/custom_button/custom_button';
import EditableBlock from '@/components/edititable_block/editable_block';
import KeyValueBlock from '@/components/key_value_block/key_value_block';

export default function CreateProductPage({stored_element}) {
    // ======= Hooks
    const location = usePathname()
    const router = useRouter()
    // ======= Hooks

    // ======= GraphQL
    const [createTempProduct, { data: createTempProductData, loading: createTempProductLoading, error: createTempProductError }] = useMutation(CreateTempProduct);
    // ======= GraphQL

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const content = buildContent(stored_element_temp, "content")
    // ======= General

    // ======= Event Handlers
    const handleProductCreateSubmit = (e) => {
        e.preventDefault();
        createTempProduct({
            variables: {
                CreateTempProductInputObject: content
            }
        })
    }
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        if(createTempProductData) router.push(`/dash/products`);
    }, [createTempProductData]);
    // ======= Effects

    return (
        <div>
            <h1>Create new product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <EditableBlock title="Current" onClick={() => {
                router.push(`${location}/${stored_element.content.series}`)
            }}>
                <KeyValueBlock title="Series">{content.series}</KeyValueBlock>
            </EditableBlock>
            <br/>
            <EditableBlock title="Current" onClick={() => {
                router.push(`${location}/${stored_element.content.title}`)
            }}>
                <KeyValueBlock title="Short">{content.title.short}</KeyValueBlock>
                <KeyValueBlock title="Long">{content.title.long}</KeyValueBlock>
            </EditableBlock>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="button_fixed_width align_right">
                <CustomButton align="vertical" onClick={handleProductCreateSubmit} disabled={createTempProductLoading}>Submit</CustomButton>
            </div>
        </div>
    );
}
