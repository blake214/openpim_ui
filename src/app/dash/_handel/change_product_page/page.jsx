"use client"

import { usePathname } from 'next/navigation'

export default function ChangeProductPage({stored_element}) {
    const location = usePathname()

    localStorage.setItem('edit_key', JSON.stringify({
        type: "edit_type",
        content: "content"
    }));

    return (
        <>
            <h3>This is a change_type</h3>
            {JSON.stringify(stored_element.content)}
            <hr className='hr_surface_color_1'/>
            <p>Previous content</p>
            <hr className='hr_surface_color_1'/>
            <p>New content</p>
            <hr className='hr_surface_color_1'/>
            <a href={`${location}/edit_key`}>Edit content xxx</a>
        </>
    );
}
