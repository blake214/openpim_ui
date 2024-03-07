"use client"
import { usePathname } from 'next/navigation'

export default function ManageProductPage() {
    const location = usePathname()
    localStorage.setItem('change_key', JSON.stringify({
        type: "change_type",
        content: "content"
    }));
    return (
        <div>
            <h3>Single Product Managing Page</h3>
            <br></br>
            <a href={`${location}/change_key`}>Change ccc</a>
        </div>
    );
}
