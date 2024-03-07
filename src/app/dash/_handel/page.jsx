"use client"

import { usePathname } from 'next/navigation'
import CreateProductPage from './create_produt_page/page';
import EditPage from './edit_page/page';
import ChangeProductPage from './change_product_page/page';

export default function HandelPage() {
    /** Getting key_id
     * Here we get the last rote path, which should be a key value in local disk
     * We check the type of this object and parse it to the correct handling page
    */
    const location = usePathname()
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    const stored_element = JSON.parse(localStorage.getItem(lastRoute))
    return (
        <>
        {stored_element.type == "create_product" && <CreateProductPage stored_element={stored_element} />}
        {stored_element.type == "change_product" && <ChangeProductPage stored_element={stored_element} />}
        {stored_element.type == "edit" && <EditPage stored_element={stored_element} />}
        </>
    );
}
