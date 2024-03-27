"use client"

import { notFound, usePathname } from 'next/navigation'
import { mongoIdPath } from '@/lib/helpers';
import UserResolvePage from './user_resolve/page';
import ResolvePage from './resolve/page';

export default function IdPage() {
    // ======= Hooks
    const location = usePathname()
    // ======= Hooks

    // ======= General
    const parts = location.split('/');
    const lastRoute = parts[parts.length - 1];
    const [mongo_id, type] = mongoIdPath(lastRoute)
    if(!type) notFound()
    const prevRoute = location.replace(`/${lastRoute}`, "")
    // ======= General

    console.log(type)

    if(type == "user_resolve") return (<UserResolvePage
        location={location}
        mongoId={mongo_id}
        prevRoute={prevRoute}
    />)
    else if(type == "resolve") return (<ResolvePage
        location={location}
        mongoId={mongo_id}
        prevRoute={prevRoute}
    />)
    else notFound()
}
