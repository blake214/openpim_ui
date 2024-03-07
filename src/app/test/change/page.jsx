"use client"

import { usePathname } from 'next/navigation'

export default function ChangePage() {
    console.log("================================= ChangePage")
    const location = usePathname()
    localStorage.setItem('change_key_1', JSON.stringify({
        type: "element_1",
        content: "content_1"
    }));
    console.log("================================= ChangePage")
    return (
        <div>
            <h1>Change Page</h1>
            <a href={`${location}/change_key_1`}>element_1</a>
        </div>
    );
}
