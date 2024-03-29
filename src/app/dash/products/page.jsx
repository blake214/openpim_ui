"use client"

import CustomLink from "@/components/custom_link/custom_link";

export default function ProductsPage() {
    return (
        <div>
            <h1>Products</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <div className={"button_fixed_width"}><CustomLink href="products/manage">Manage products</CustomLink></div>
            <br/>
            <div className={"button_fixed_width"}><CustomLink href="products/create">Create product</CustomLink></div>
        </div>
    );
}
