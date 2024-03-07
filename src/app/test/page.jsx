"use client"

export default function EditPage() {
    localStorage.setItem('key1', JSON.stringify({
        type: "element1",
        content: "content"
    }));

    return (
        <div>
            <h1>Test Page</h1>
            <a href='/test/edit/key1'>element1</a>
        </div>
    );
}
