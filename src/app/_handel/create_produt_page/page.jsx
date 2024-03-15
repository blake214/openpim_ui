"use client"

import { buildContent, cleanLocalStorageChildrenKeys } from '@/lib/helpers';
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client';
import { CreateTempProduct } from '@/lib/graphql_mutation';
import { useEffect } from 'react';

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
    const handleCreateProductSubmit = (e) => {
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
        if(createTempProductData) {
            // Replace the local variable with the id
            localStorage?.setItem(lastRoute, JSON.stringify({
                type: "edit",
                sub_type: "product_id",
                title: "product",
                content: createTempProductData.createTempProduct._id
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
        </div>
    );
}
