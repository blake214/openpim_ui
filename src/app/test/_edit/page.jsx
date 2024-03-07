"use client"

import { usePathname, useRouter } from 'next/navigation'

export default function EditPage() {
    console.log("================================= EditPage")
    const location = usePathname()
    console.log("location: ", location)
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    console.log("lastRoute: ", lastRoute)
    const stored_element = localStorage.getItem(lastRoute)
    console.log("stored_element: ", JSON.parse(stored_element))


    localStorage.setItem('key2', JSON.stringify({
        type: "element2",
        content: "content2"
    }));
    console.log("================================= EditPage")
    return (
        <div>
            <h1>Edit Page</h1>
            <a href={`${location}/key2`}>element2</a>
        </div>
    );
}
