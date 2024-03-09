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
// import { useEffect, useState } from "react";

export default function Account() {
    // ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

    // ======= GraphQL
    const { loading: AccountPageGetUserLoading, error: AccountPageGetUserError, data: AccountPageGetUserData } = useQuery(AccountPageGetUser);
    // ======= GraphQL

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
                    <EditableBlock title="Current" onClick={() => {
                        router.push(`${location}/first_name?change_type=${"fname"}&data_key=${"key_in_local"}`)
                    }}>
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
                    <EditableBlock title="Current" onClick={() => {router.push(`${location}/notifications`)}}>
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