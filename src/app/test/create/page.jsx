"use client"

import { usePathname } from 'next/navigation'

export default function CreatePage() {
    console.log("================================= CreatePage")
    const location = usePathname()
    localStorage.setItem('create_key_1', JSON.stringify({
        type: "element_1",
        content: "content_1"
    }));
    console.log("================================= CreatePage")
    return (
        <div>
            <h1>Create Page</h1>
            <a href={`${location}/create_key_1`}>element_1</a>
        </div>
    );
}
