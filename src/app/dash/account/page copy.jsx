"use client"
import EditableBlock from "@/components/edititable_block/editable_block";
import KeyValueBlock from "@/components/key_value_block/key_value_block";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";

import { useRouter, usePathname } from 'next/navigation'

const user_details = {
    _id: "507f1f77bcf86cd799439012",
    emails: {
        primary_email: "blake@example.com",
        recovery_email: "recovery@example.com"
    },
    password: {
        password: "*********",
        password_length: 6
    },
    name: {
        fname: "Blake",
        lname: "Kellett"
    },
    token_key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJIZWxsbyB5b3UiLCJuYW1lIjoiV2h5IGFyZSB5b3UgY2hlY2tpbmcgbXkgdG9rZW4_ICggzaHCsCDNnMqWIM2hwrApIiwiaWF0IjoxNTE2MjM5MDIyfQ.yAP0xiTwp6vqIYbLKLVBRv-gTyMvU17rT3H8uErLjHA",
    language_id: "EN",
    ui_theme_id: "AANB",
    actions: {
        pending: [],
        positive_actions: [],
        negative_actions: [],
    },
    messages: [],
    temp_products: [],
    temp_entitys: [],
    account_limits: {
        rate_limit_scaler: 0,
        graphql_rate_limit_scaler: 0
    },
    account_status: {
        banned: false,
        unban_date: null,
        lifetime_banned: 0
    },
    token_date_valid: "1970-01-01T00:00:00.000Z",
    notifications: {
        product_changes: "AAPA",
        product_issues: "AAPA",
        entity_changes: "AAPA",
        entity_issues: "AAPA",
        entity_product_links: "AAPA",
    },
    score: {
        score_value: 400,
        date_scored: "1970-01-01T00:00:00.000Z",
    },
    payment_credits: 5.0,
    dates: {
        date_created: "1970-01-01T00:00:00.000Z",
        date_updated: "1970-01-01T00:00:00.000Z"
    },
}

export default function Account() {
    const router = useRouter();
    const location = usePathname()
    const handleEditFnameButton = () => {
        router.push(`${location}/first_name`);
    };
    const handleEditLnameButton = () => {
        router.push(`${location}/last_name`);
    };
    return (
        <div>
            <br/>
            <h1>Account</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <KeyValueBlock title="User ID">{user_details._id}</KeyValueBlock>
            <KeyValueBlock title="Account Banned">{user_details.account_status.banned ? ("Yes") : ("No")}</KeyValueBlock>
            <KeyValueBlock title="Payment Credits">{user_details.payment_credits}</KeyValueBlock>
            <br/>
            <h2>Basic Info</h2>
            <hr className="hr_surface_color_1"/>
            <SectionBlockMinimizer heading="First Name" start_state="true">
                <EditableBlock title="Current" content={[ { key: "First Name", value: `${user_details.name.fname}` } ]} edit_event={handleEditFnameButton}></EditableBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Last Name" start_state="true">
                <EditableBlock title="Current" content={[ { key: "Last Name", value: `${user_details.name.lname}` } ]} edit_event={handleEditLnameButton}></EditableBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Password" start_state="true">
                <EditableBlock title="Current" content={[ { key: "Password", value: `${user_details.password.password}` } ]} edit_event={handleEditLnameButton}></EditableBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="API Token" start_state="true">
                <EditableBlock title="Current" content={[ { key: "API Token", value: `${user_details.token_key}` } ]} edit_event={handleEditLnameButton}></EditableBlock>
            </SectionBlockMinimizer>
        </div>
    );
}