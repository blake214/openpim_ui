"use client"

import { usePathname, useRouter } from 'next/navigation'
import { createShortUuid } from '@/lib/helpers';
import CustomButton from "@/components/custom_button/custom_button";

export default function CreateProductPage() {
    const location = usePathname()
    const router = useRouter()

    const handleCreateFreshProduct = () => {
        const create_product_id = createShortUuid(10)
        const product_series_id = createShortUuid(10)
        const product_title_id = createShortUuid(10)

        localStorage.setItem(create_product_id, JSON.stringify({
            type: "create_product",
            title: "create_product",
            content: {
                series: product_series_id,
                title: product_title_id,
            }
        }));

        localStorage.setItem(product_series_id, JSON.stringify({
            type: "edit",
            edit_type: "product_series",
            title: "product_series",
            content: "series_1"
        }));

        localStorage.setItem(product_title_id, JSON.stringify({
            type: "edit",
            edit_type: "product_title",
            title: "product_title",
            content: {
                short: "title_s",
                long: "title_l"
            }
        }));

        router.push(`${location}/${create_product_id}`)
    }

    return (
        <div>
            <h1>Create new product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <div className={"button_fixed_width"}><CustomButton align="vertical" onClick={handleCreateFreshProduct}>Create fresh product</CustomButton></div>
            <br/>
            <div className={"button_fixed_width"}><CustomButton align="vertical" onClick={()=>{}}>Create product from template</CustomButton></div>
        </div>
    );
}
