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

export default function HandelPage() {
    // ======= Hooks
    const location = usePathname()
    // ======= Hooks

    // ======= States
    const [mounted, setMounted] = useState(false)
    // ======= States

    // ======= General
    /** Getting key_id
     * Here we get the last rote path, which should be a key value in local disk
     * We check the type of this object and parse it to the correct handling page
    */
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    const prevRoute = location.replace(`/${lastRoute}`, "")
    let stored_element
    if(typeof localStorage !== "undefined") stored_element = JSON.parse(localStorage.getItem(lastRoute))
    // ======= General

    // ======= Effects
    useEffect(() => {
		setMounted(true)
    }, [])
    // ======= Effects

    if(!mounted) return <>
        <Skeleton width='100'/>
        <Skeleton/>
        <Skeleton/>
        <br/>
        <Skeleton width='100'/>
        <Skeleton height='200' width='100'/>
    </>

    return (
        <>
        {stored_element.type == "edit" && <EditPage
            stored_element={stored_element}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {stored_element.type == "create_product" && <CreateProductPage
            stored_element={stored_element}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {stored_element.type == "change_product" && <ChangeProductPage
            stored_element={stored_element}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {stored_element.type == "change_user" && <ChangeUserPage
            stored_element={stored_element}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {stored_element.type == "create_unregistered_entity" && <CreateUnregisteredEntityPage
            stored_element={stored_element}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {stored_element.type == "create_video" && <CreateVideoPage
            stored_element={stored_element}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        {stored_element.type == "create_pdf" && <CreatePdfPage
            stored_element={stored_element}
            location={location}
            lastRoute={lastRoute}
            prevRoute={prevRoute}
        />}
        </>
    );
}
