"use client"

import { gql } from '@apollo/client';


import styles from "./style.module.css"
import { buildContent } from '@/lib/helpers';
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import CustomButton from '@/components/custom_button/custom_button';
import EditableBlock from '@/components/edititable_block/editable_block';
import KeyValueBlock from '@/components/key_value_block/key_value_block';
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import { CreateEmailVerification, UserChange } from "@/lib/graphql";
import { keyDictionary } from "@/lib/key_dictionary";


export default function ChangeUserPage({stored_element}) {
    // ======= Hooks
    const location = usePathname()
    const router = useRouter()
    // ======= Hooks

    // ======= GraphQL
    const [createEmailVerification_primary_email, { data: createEmailVerificationData_primary_email, loading: createEmailVerificationLoading_primary_email, error: createEmailVerificationError_primary_email, reset: createEmailVerificationReset_primary_email }] = useMutation(CreateEmailVerification);
    const [createEmailVerification_recovery_email, { data: createEmailVerificationData_recovery_email, loading: createEmailVerificationLoading_recovery_email, error: createEmailVerificationError_recovery_email, reset: createEmailVerificationReset_recovery_email }] = useMutation(CreateEmailVerification);
    const [createEmailVerification_approval, { data: createEmailVerificationData_approval, loading: createEmailVerificationLoading_approval, error: createEmailVerificationError_approval, reset: createEmailVerificationReset_approval }] = useMutation(CreateEmailVerification);

    const [userChange, { data: userChangeData, loading: userChangeLoading, error: userChangeError }] = useMutation(UserChange);
    // ======= GraphQL

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const new_content = buildContent(stored_element_temp, "new_content")
    const existing_content = buildContent(stored_element_temp, "existing_content")
    // ======= General

    // ======= States
    const [userChangeVerificationInput, setUserChangeVerificationInput] = useState({
        primary_email_verification_code: '',
        recovery_email_verification_code: '',
        approval_code: ''
    });
    // ======= States

    // ======= Change Handlers
    const handleUserChangeVerificationInputChange = (e) => {
        const { name, value } = e.target;
        setUserChangeVerificationInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleUserChangeSubmit = (e) => {
        e.preventDefault();
        /** If there is a primary_email change */
        if("primary_email" in new_content) {

        }
        /** Else If there is a recovery_email change */
        else if("recovery_email" in new_content) {

        }
        /** Else for general changes */
        else {
            handleUserVerificationInputSubmit()
        }
        
    };

    const handleUserVerificationInputSubmit = (e=null) => {
        if(e) e.preventDefault();
        userChange({
            variables: {
                ...(new_content.fname && {fname: new_content.fname}),
                ...(new_content.lname && {lname: new_content.lname}),
                ...(new_content.password && {password: new_content.password}),
                ...(new_content.primary_email && {primary_email: new_content.primary_email}),
                ...(new_content.recovery_email && {recovery_email: new_content.recovery_email}),
                ...(new_content.token_key && {token_key: new_content.token_key}),
                ...(new_content.logout_users && {logout_users: new_content.logout_users}),
                ...(new_content.language_id && {language_id: new_content.language_id}),
                ...(new_content.ui_theme_id && {ui_theme_id: new_content.ui_theme_id}),
                ...(new_content.notifications && {notifications: new_content.notifications}),
                ...(userChangeVerificationInput.primary_email_verification_code && {primary_email_verification_code: userChangeVerificationInput.primary_email_verification_code}),
                ...(userChangeVerificationInput.recovery_email_verification_code && {recovery_email_verification_code: userChangeVerificationInput.recovery_email_verification_code}),
                ...(userChangeVerificationInput.approval_code && {approval_code: userChangeVerificationInput.approval_code})
            }
        })
    };
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        if(userChangeData) router.push(`/dash/account`);
    }, [userChangeData]);
    // ======= Effects

    return (
        <div>
            <h1>Change</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            
                <SectionBlockMinimizer heading="Current" start_state="false">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                    <br/>
                    <div className={styles.existing_content}>
                        {existing_content.fname && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="First Name">{existing_content.fname}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {existing_content.notifications && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="Product Changes">{keyDictionary[existing_content.notifications.product_changes]}</KeyValueBlock>
                                <KeyValueBlock title="Product Issues">{keyDictionary[existing_content.notifications.product_issues]}</KeyValueBlock>
                                <KeyValueBlock title="Entity Changes">{keyDictionary[existing_content.notifications.entity_changes]}</KeyValueBlock>
                                <KeyValueBlock title="Entity Issues">{keyDictionary[existing_content.notifications.entity_issues]}</KeyValueBlock>
                                <KeyValueBlock title="Entity Product Links">{keyDictionary[existing_content.notifications.entity_product_links]}</KeyValueBlock>
                                
                            </EditableBlock>
                        }
                    </div>
                </SectionBlockMinimizer>
            
                <SectionBlockMinimizer heading="New" start_state="true">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                    <br/>
                    <div className={styles.new_content}>
                        {new_content.fname && 
                            <EditableBlock title="New" onClick={() => {
                                router.push(`${location}/${stored_element.new_content.fname}`)
                            }}>
                                <KeyValueBlock title="First Name">{new_content.fname}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {new_content.notifications && 
                            <EditableBlock title="New" onClick={() => {
                                router.push(`${location}/${stored_element.new_content.notifications}`)
                            }}>
                                <KeyValueBlock title="Product Changes">{keyDictionary[new_content.notifications.product_changes]}</KeyValueBlock>
                                <KeyValueBlock title="Product Issues">{keyDictionary[new_content.notifications.product_issues]}</KeyValueBlock>
                                <KeyValueBlock title="Entity Changes">{keyDictionary[new_content.notifications.entity_changes]}</KeyValueBlock>
                                <KeyValueBlock title="Entity Issues">{keyDictionary[new_content.notifications.entity_issues]}</KeyValueBlock>
                                <KeyValueBlock title="Entity Product Links">{keyDictionary[new_content.notifications.entity_product_links]}</KeyValueBlock>
                            </EditableBlock>
                        }
                    </div>
                </SectionBlockMinimizer>
            
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="button_fixed_width align_right">
                <CustomButton align="vertical" onClick={handleUserChangeSubmit} disabled={userChangeLoading} busy={userChangeLoading}>Update</CustomButton>
            </div>
        </div>
    );
}
