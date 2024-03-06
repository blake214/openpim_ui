"use client"
import EditableBlock from "@/components/edititable_block/editable_block";
import KeyValueBlock from "@/components/key_value_block/key_value_block";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";

import { useRouter, usePathname } from 'next/navigation'
import { gql, useQuery } from '@apollo/client';
// import { useEffect, useState } from "react";

const get_user_query = gql`
    query GetUser {
        getUser {
            _id
            emails {
                primary_email
                recovery_email
            }
            password {
                password
                password_length
            }
            name {
                fname
                lname
            }
            token_key
            language_id
            ui_theme_id
            account_limits {
                rate_limit_scaler
                graphql_rate_limit_scaler
            }
            account_status {
                banned
                unban_date
                lifetime_banned
            }
            token_date_valid
            notifications {
                product_changes
                product_issues
                entity_changes
                entity_issues
                entity_product_links
            }
            score {
                score_value
                date_scored
            }
            payment_credits
            dates {
                date_created
                date_updated
            }
        }
    }
`;

export default function Account() {
    // ======= GraphQL
    const { loading, error, data } = useQuery(get_user_query);
    // ======= GraphQL


    // const router = useRouter();
    // const location = usePathname()
    // const handleEditFnameButton = () => {
    //     router.push(`${location}/first_name`);
    // };
    // const handleEditLnameButton = () => {
    //     router.push(`${location}/last_name`);
    // };
    return (
        <div>
            <br/>
            {loading && (<>loading...</>)}
            {error && (<>error...{JSON.stringify(error)}</>)}
            
            <h1>Account</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            {data && (
                <>
                <KeyValueBlock title="User ID">{data.getUser._id}</KeyValueBlock>
                <KeyValueBlock title="Account Banned">{data.getUser.account_status.banned ? ("Yes") : ("No")}</KeyValueBlock>
                <KeyValueBlock title="Payment Credits">{data.getUser.payment_credits}</KeyValueBlock>
                <KeyValueBlock title="Email">{data.getUser.emails.primary_email}</KeyValueBlock>
                </>
            )}
            <br/>
            <h2>Basic Info</h2>
            <hr className="hr_surface_color_1"/>
            <SectionBlockMinimizer heading="First Name" start_state="true">
                {/* <EditableBlock title="Current" content={[ { key: "First Name", value: `${user_details.name.fname}` } ]} edit_event={handleEditFnameButton}></EditableBlock> */}
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Last Name" start_state="true">
                {/* <EditableBlock title="Current" content={[ { key: "Last Name", value: `${user_details.name.lname}` } ]} edit_event={handleEditLnameButton}></EditableBlock> */}
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Password" start_state="true">
                {/* <EditableBlock title="Current" content={[ { key: "Password", value: `${user_details.password.password}` } ]} edit_event={handleEditLnameButton}></EditableBlock> */}
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="API Token" start_state="true">
                {/* <EditableBlock title="Current" content={[ { key: "API Token", value: `${user_details.token_key}` } ]} edit_event={handleEditLnameButton}></EditableBlock> */}
            </SectionBlockMinimizer>
        </div>
    );
}