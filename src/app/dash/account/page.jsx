"use client"

import EditableBlock from "@/components/edititable_block/editable_block";
import KeyValueBlock from "@/components/key_value_block/key_value_block";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import Skeleton from "@/components/skeleton/skeleton";
import { useRouter, usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client';
import { AccountPageGetUser } from "@/lib/graphql_query";
import { createShortUuid } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { keyDictionary } from "@/lib/key_dictionary";

export default function Account() {
    // ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

    // ======= GraphQL
    const { loading: AccountPageGetUserLoading, error: AccountPageGetUserError, data: AccountPageGetUserData, refetch: AccountPageGetUserRefetch } = useQuery(AccountPageGetUser);
    // ======= GraphQL

    // ======= States
    const [mounted, setMounted] = useState(false)
    // ======= States

    // ================================================= Handlers
    // ======= Fname
    const handleEditFname = () => {
        const change_user_id = createShortUuid()
        const change_user_existing_id = createShortUuid()
        const change_user_new_id = createShortUuid()

        localStorage.setItem(change_user_id, JSON.stringify({
            type: "change_user",
            sub_type: "change_user_fname",
            title: "change_first_name",
            existing_content: {
                fname: change_user_existing_id
            },
            new_content: {
                fname: change_user_new_id
            },
        }));

        localStorage.setItem(change_user_existing_id, JSON.stringify({
            type: "reference",
            sub_type: "user_name_fname",
            title: "first_name",
            content: AccountPageGetUserData.getUser.name.fname,
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_name_fname",
            title: "first_name",
            content: AccountPageGetUserData.getUser.name.fname,
        }));

        router.push(`${location}/${change_user_id}`)
    }
    // ======= Fname

    // ======= Lname
    const handleEditLname = () => {
        const change_user_id = createShortUuid()
        const change_user_existing_id = createShortUuid()
        const change_user_new_id = createShortUuid()

        localStorage.setItem(change_user_id, JSON.stringify({
            type: "change_user",
            sub_type: "change_user_lname",
            title: "change_last_name",
            existing_content: {
                lname: change_user_existing_id
            },
            new_content: {
                lname: change_user_new_id
            },
        }));

        localStorage.setItem(change_user_existing_id, JSON.stringify({
            type: "reference",
            sub_type: "user_name_lname",
            title: "last_name",
            ...(AccountPageGetUserData.getUser.name.lname ? ({ content: AccountPageGetUserData.getUser.name.lname }) : ({ content: "" }))
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_name_lname",
            title: "last_name",
            ...(AccountPageGetUserData.getUser.name.lname ? ({ content: AccountPageGetUserData.getUser.name.lname }) : ({ content: "" }))
        }));

        router.push(`${location}/${change_user_id}`)
    }
    // ======= Lname

    // ======= Password
    const handleEditPassword = () => {
        const change_user_id = createShortUuid()
        const change_user_existing_id = createShortUuid()
        const change_user_new_id = createShortUuid()

        localStorage.setItem(change_user_id, JSON.stringify({
            type: "change_user",
            sub_type: "change_user_password",
            title: "change_password",
            existing_content: {
                password: change_user_existing_id
            },
            new_content: {
                password: change_user_new_id
            },
        }));

        localStorage.setItem(change_user_existing_id, JSON.stringify({
            type: "reference",
            sub_type: "user_password_password",
            title: "password",
            content: AccountPageGetUserData.getUser.password.password,
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_password_password",
            title: "password",
            content: "",
        }));

        router.push(`${location}/${change_user_id}`)
    }
    // ======= Password

    // ======= Primary Email
    const handleEditPrimaryEmail = () => {
        const change_user_id = createShortUuid()
        const change_user_existing_id = createShortUuid()
        const change_user_new_id = createShortUuid()

        localStorage.setItem(change_user_id, JSON.stringify({
            type: "change_user",
            sub_type: "change_user_primary_email",
            title: "change_primary_email",
            existing_content: {
                primary_email: change_user_existing_id
            },
            new_content: {
                primary_email: change_user_new_id
            },
        }));

        localStorage.setItem(change_user_existing_id, JSON.stringify({
            type: "reference",
            sub_type: "user_emails_primary_email",
            title: "primary_email",
            content: AccountPageGetUserData.getUser.emails.primary_email,
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_emails_primary_email",
            title: "primary_email",
            content: AccountPageGetUserData.getUser.emails.primary_email,
        }));

        router.push(`${location}/${change_user_id}`)
    }
    // ======= Primary Email

    // ======= Recovery Email
    const handleEditRecoveryEmail = () => {
        const change_user_id = createShortUuid()
        const change_user_existing_id = createShortUuid()
        const change_user_new_id = createShortUuid()

        localStorage.setItem(change_user_id, JSON.stringify({
            type: "change_user",
            sub_type: "change_user_recovery_email",
            title: "change_recovery_email",
            existing_content: {
                recovery_email: change_user_existing_id
            },
            new_content: {
                recovery_email: change_user_new_id
            },
        }));

        localStorage.setItem(change_user_existing_id, JSON.stringify({
            type: "reference",
            sub_type: "user_emails_recovery_email",
            title: "recovery_email",
            ...(AccountPageGetUserData.getUser.emails.recovery_email ? ({ content: AccountPageGetUserData.getUser.emails.recovery_email }) : ({ content: "" }))
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_emails_recovery_email",
            title: "recovery_email",
            ...(AccountPageGetUserData.getUser.emails.recovery_email ? ({ content: AccountPageGetUserData.getUser.emails.recovery_email }) : ({ content: "" }))
        }));

        router.push(`${location}/${change_user_id}`)
    }
    // ======= Recovery Email

    // ======= Token Key
    const handleEditTokenKey = () => {
        const change_user_id = createShortUuid()
        const change_user_existing_id = createShortUuid()
        const change_user_new_id = createShortUuid()

        localStorage.setItem(change_user_id, JSON.stringify({
            type: "change_user",
            sub_type: "change_user_token_key",
            title: "reissue_token_key",
            existing_content: {
                token_key: change_user_existing_id
            },
            new_content: {
                token_key: change_user_new_id
            },
        }));

        localStorage.setItem(change_user_existing_id, JSON.stringify({
            type: "reference",
            sub_type: "user_token_key",
            title: "token_key",
            ...(AccountPageGetUserData.getUser.token_key ? ({ content: AccountPageGetUserData.getUser.token_key }) : ({ content: "" }))
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_token_key",
            title: "token_key",
            content: true
        }));

        router.push(`${location}/${change_user_id}`)
    }
    // ======= Token Key

    // ======= Notifications
    const handleEditNotifications = () => {
        const change_user_id = createShortUuid()
        const change_user_existing_id = createShortUuid()
        const change_user_new_id = createShortUuid()

        localStorage.setItem(change_user_id, JSON.stringify({
            type: "change_user",
            sub_type: "change_user_notifications",
            title: "change_notifications",
            existing_content: {
                notifications: change_user_existing_id
            },
            new_content: {
                notifications: change_user_new_id
            },
        }));

        localStorage.setItem(change_user_existing_id, JSON.stringify({
            type: "reference",
            sub_type: "user_notifications",
            title: "notifications",
            content: AccountPageGetUserData.getUser.notifications,
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_notifications",
            title: "notifications",
            content: AccountPageGetUserData.getUser.notifications,
        }));

        router.push(`${location}/${change_user_id}`)
    }
    // ======= Notifications
    // ================================================= Handlers

    // ======= Effects
    useEffect(() => {
		setMounted(true)
	}, [])
    useEffect(() => {
        if(mounted) AccountPageGetUserRefetch()
	}, [mounted])
    // ======= Effects

    return (
        <div>
            <br/>
            <h1>Account</h1>
            <br/>
            {!AccountPageGetUserData ? (
                <>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                </>
            ) : (
                <>
                <KeyValueBlock title="User ID">{AccountPageGetUserData.getUser._id}</KeyValueBlock>
                <KeyValueBlock title="Account Banned">{AccountPageGetUserData.getUser.account_status.banned ? ("Yes") : ("No")}</KeyValueBlock>
                <KeyValueBlock title="Payment Credits">{AccountPageGetUserData.getUser.payment_credits}</KeyValueBlock>
                </>
            )}
            <br/>
            {!AccountPageGetUserData ? (
                <>
                <h2>Basic Info</h2>
                <Skeleton height="300" width="100"/>
                </>
            ) : (
                <>
                <h2>Basic Info</h2>
                <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
                <SectionBlockMinimizer heading="First Name" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditFname}>
                        <KeyValueBlock title="First Name">{AccountPageGetUserData.getUser.name.fname}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="Last Name" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditLname}>
                        <KeyValueBlock title="Last Name">{AccountPageGetUserData.getUser.name.lname}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="Password" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditPassword}>
                        <KeyValueBlock title="Password">{AccountPageGetUserData.getUser.password.password}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="API Token" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditTokenKey}>
                        <KeyValueBlock title="Token Key">{AccountPageGetUserData.getUser.token_key}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="Notifications" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditNotifications}>
                        <KeyValueBlock title="Product Changes">{keyDictionary[AccountPageGetUserData.getUser.notifications.product_changes]}</KeyValueBlock>
                        <KeyValueBlock title="Product Changes">{keyDictionary[AccountPageGetUserData.getUser.notifications.product_issues]}</KeyValueBlock>
                        <KeyValueBlock title="Entity Changes">{keyDictionary[AccountPageGetUserData.getUser.notifications.entity_changes]}</KeyValueBlock>
                        <KeyValueBlock title="Entity Issues">{keyDictionary[AccountPageGetUserData.getUser.notifications.entity_issues]}</KeyValueBlock>
                        <KeyValueBlock title="Entity Product Links">{keyDictionary[AccountPageGetUserData.getUser.notifications.entity_product_links]}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <h2>Contact Info</h2>
                <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
                <SectionBlockMinimizer heading="Primary Email" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditPrimaryEmail}>
                        <KeyValueBlock title="Primary Email">{AccountPageGetUserData.getUser.emails.primary_email}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="Recovery Email" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditRecoveryEmail}>
                        <KeyValueBlock title="Recovery Email">{AccountPageGetUserData.getUser.emails.recovery_email}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                </>
            )}
        </div>
    );
}