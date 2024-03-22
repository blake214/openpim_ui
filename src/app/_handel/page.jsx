"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import Skeleton from '@/components/skeleton/skeleton';
import CreateProductPage from './create_produt_page/page';
import EditPage from './edit_page/page';
import ChangeProductPage from './change_product_page/page';
import ChangeUserPage from './change_user_page/page';
import CreateUnregisteredEntityPage from './create_unregistered_entity/page';
import CreateVideoPage from './create_video/page';
import CreatePdfPage from './create_pdf/page';
import CreateImagePage from './create_image/page';

export default function HandelPage() {
    // ======= Hooks
    const location = usePathname()
    // ======= Hooks

    // ======= States
    const [storedElement, setStoredElement] = useState()
    // ======= States

    // ======= General
    /** Getting key_id
     * Here we get the last rote path, which should be a key value in local disk
     * We check the type of this object and parse it to the correct handling page
    */
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    const prevRoute = location.replace(`/${lastRoute}`, "")
    // ======= General

    // ======= Effects
    useEffect(() => {
        const stored_element = JSON.parse(localStorage.getItem(lastRoute))
		if(stored_element) setStoredElement(stored_element)
    }, [])
    // ======= Effects

    if(!storedElement) return <>
        <Skeleton width='100'/>
        <Skeleton/>
        <Skeleton/>
        <br/>
        <Skeleton width='100'/>
        <Skeleton height='200' width='100'/>
    </>

    return (
        <>
        {storedElement.type == "edit" && <EditPage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {storedElement.type == "create_product" && <CreateProductPage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {storedElement.type == "change_product" && <ChangeProductPage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {storedElement.type == "change_user" && <ChangeUserPage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {storedElement.type == "create_unregistered_entity" && <CreateUnregisteredEntityPage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {storedElement.type == "create_video" && <CreateVideoPage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {storedElement.type == "create_pdf" && <CreatePdfPage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {storedElement.type == "create_image" && <CreateImagePage
            stored_element={storedElement}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        </>
    );
}
