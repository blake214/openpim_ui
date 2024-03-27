"use client"

import { notFound, usePathname } from 'next/navigation'
import { isLocalUuidKey, mongoIdPath } from '@/lib/helpers';
import LocalKeyPage from '../_local_key/page';
import IdPage from '../_id/page';

export default function HandelPage() {
    // ======= Hooks
    const location = usePathname()
    // ======= Hooks

    // ======= General
    /** Getting last route key
     * Here we get the last route path, which could be a key value in local disk OR a id
    */
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    // ======= General

    if(isLocalUuidKey(lastRoute)) return <LocalKeyPage/>
    else if(mongoIdPath(lastRoute)) return <IdPage/>
    else return notFound()
}