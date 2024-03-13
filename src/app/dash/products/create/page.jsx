"use client"

import { usePathname, useRouter } from 'next/navigation'
import { createLocalUuidKey } from '@/lib/helpers';
import CustomButton from "@/components/custom_button/custom_button";

export default function CreateProductPage() {
    // ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

    // ================================================= Handlers
    // ======= Create fresh new product
    const handleCreateFreshProduct = () => {
        const create_product_id = createLocalUuidKey()
        const product_series_id = createLocalUuidKey(create_product_id)
        const product_title_id = createLocalUuidKey(create_product_id)

        localStorage?.setItem(create_product_id, JSON.stringify({
            type: "create_product",
            title: "create_product",
            content: {
                series: product_series_id,
                title: product_title_id,
            }
        }));

        localStorage?.setItem(product_series_id, JSON.stringify({
            type: "edit",
            sub_type: "product_series",
            title: "series",
            content: ""
        }));

        localStorage?.setItem(product_title_id, JSON.stringify({
            type: "edit",
            sub_type: "product_title",
            title: "title",
            content: {
                short: "",
                long: ""
            }
        }));

        router.push(`${location}/${create_product_id}`)
    }
    // ======= Create fresh new product
    // ======= Create unregistered entity
    const handleCreateUnregisteredEntity = () => {
        const create_unregistered_entity_id = createLocalUuidKey()
        const product_entity_types_id = createLocalUuidKey(create_unregistered_entity_id)
        const product_entity_name_id = createLocalUuidKey(create_unregistered_entity_id)

        localStorage?.setItem(create_unregistered_entity_id, JSON.stringify({
            type: "create_unregistered_entity",
            title: "create_unregistered_entity",
            content: {
                entity_types: product_entity_types_id,
                entity_name: product_entity_name_id,
            }
        }));

        localStorage?.setItem(product_entity_types_id, JSON.stringify({
            type: "edit",
            sub_type: "unregistered_entity_types",
            title: "entity_types",
            content: ["AAXA"]
        }));

        localStorage?.setItem(product_entity_name_id, JSON.stringify({
            type: "edit",
            sub_type: "unregistered_entity_name",
            title: "entity_name",
            content: ""
        }));

        router.push(`${location}/${create_unregistered_entity_id}`)
    }
    // ======= Create unregistered entity
    // ================================================= Handlers

    return (
        <div>
            <h1>Create product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={handleCreateFreshProduct}>Create fresh product</CustomButton></div>
            <br/>
            <div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={()=>{}} disabled={true}>Create product from template</CustomButton></div>
            <br/>
            <div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={handleCreateUnregisteredEntity} >Test .... Unregistered entity</CustomButton></div>
        </div>
    );
}
