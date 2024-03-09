"use client"
import EditableBlock from "@/components/edititable_block/editable_block";
import KeyValueBlock from "@/components/key_value_block/key_value_block";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";

import { useRouter, usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client';
import { AccountPageGetUser } from "@/lib/graphql";
import { IoMdArrowRoundBack } from "react-icons/io";
import Skeleton from "@/components/skeleton/skeleton";
import CustomButton from "@/components/custom_button/custom_button";
import { createShortUuid } from "@/lib/helpers";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

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

    // ======= Handlers
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
            sub_type: "user_fname",
            title: "fname",
            content: AccountPageGetUserData.getUser.name.fname,
        }));

        localStorage.setItem(change_user_new_id, JSON.stringify({
            type: "edit",
            sub_type: "user_fname",
            title: "fname",
            content: AccountPageGetUserData.getUser.name.fname,
        }));

        router.push(`${location}/${change_user_id}`)
    }
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
    // ======= Handlers

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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
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
                <KeyValueBlock title="Email">{AccountPageGetUserData.getUser.emails.primary_email}</KeyValueBlock>
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
                    <EditableBlock title="Current" onClick={() => {router.push(`${location}/last_name`)}}>
                        <KeyValueBlock title="Last Name">{AccountPageGetUserData.getUser.name.lname}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="Password" start_state="false">
                    <EditableBlock title="Current" onClick={() => {router.push(`${location}/password`)}}>
                        <KeyValueBlock title="Password">{AccountPageGetUserData.getUser.password.password}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="API Token" start_state="false">
                    <EditableBlock title="Current" onClick={() => {router.push(`${location}/token_key`)}}>
                        <KeyValueBlock title="Token Key">{AccountPageGetUserData.getUser.token_key}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="Notifications" start_state="false">
                    <EditableBlock title="Current" onClick={handleEditNotifications}>
                        <KeyValueBlock title="Product Changes">{AccountPageGetUserData.getUser.notifications.product_changes}</KeyValueBlock>
                        <KeyValueBlock title="Product Changes">{AccountPageGetUserData.getUser.notifications.product_issues}</KeyValueBlock>
                        <KeyValueBlock title="Entity Changes">{AccountPageGetUserData.getUser.notifications.entity_changes}</KeyValueBlock>
                        <KeyValueBlock title="Entity Issues">{AccountPageGetUserData.getUser.notifications.entity_issues}</KeyValueBlock>
                        <KeyValueBlock title="Entity Product Links">{AccountPageGetUserData.getUser.notifications.entity_product_links}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="User sessions" start_state="false">
                    <div className={"button_fixed_width"}><CustomButton align="vertical">Log out all users</CustomButton></div>
                </SectionBlockMinimizer>
                <br/>
                <h2>Contact Info</h2>
                <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
                <SectionBlockMinimizer heading="Primary Email" start_state="false">
                    <EditableBlock title="Current" onClick={() => {router.push(`${location}/primary_email`)}}>
                        <KeyValueBlock title="Primary Email">{AccountPageGetUserData.getUser.emails.primary_email}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="Recovery Email" start_state="false">
                    <EditableBlock title="Current" onClick={() => {router.push(`${location}/recovery_email`)}}>
                        <KeyValueBlock title="Recovery Email">{AccountPageGetUserData.getUser.emails.recovery_email}</KeyValueBlock>
                    </EditableBlock>
                </SectionBlockMinimizer>
                </>
            )}
        </div>
    );
}