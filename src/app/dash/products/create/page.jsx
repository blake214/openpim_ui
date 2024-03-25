"use client"

import { usePathname, useRouter } from 'next/navigation'
import { handleCreateTempProduct } from '@/lib/action_user';
import CustomButton from "@/components/custom_button/custom_button";

export default function CreateProductPage() {
    // ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

    // ======= Event Handlers
    const handleCreateTempProduct_event = (event) => {
        event.preventDefault();
        // Create an object
        const temp_product_id = handleCreateTempProduct()
        // Route to edit that object
        router.push(`${location}/${temp_product_id}`)
    }
    // ======= Event Handlers

    return (
        <div>
            <h1>Create product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={handleCreateTempProduct_event}>Create fresh product</CustomButton></div>
            <br/>
            <div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={()=>{}} disabled={true}>Create product from template</CustomButton></div>
        </div>
    );
}
