"use client"

import styles from "../style.module.css"
import edits_styles from "@/components/edits/style.module.css"
import { buildContent } from '@/lib/helpers';
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { CreateEmailVerification, UserChange } from "@/lib/graphql_mutation";
import { keyDictionary } from "@/lib/key_dictionary";
import { useSession } from "next-auth/react"
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomButton from '@/components/custom_button/custom_button';
import EditableBlock from '@/components/edititable_block/editable_block';
import KeyValueBlock from '@/components/key_value_block/key_value_block';
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import BasicLink from "@/components/basic_link/basic_link";
import repeat from 'lodash/repeat';


export default function ChangeUserPage({stored_element}) {
    // ======= Hooks
    const { data: session, status } = useSession()
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
        // Reset the states for consistency
        createEmailVerificationReset_primary_email()
        createEmailVerificationReset_recovery_email()
        createEmailVerificationReset_approval()
        /** If there is a primary_email change */
        if("primary_email" in new_content) {
            // Send a verification for the new email
            const create_email_verification_input_object = {
                email: new_content.primary_email,
            }
            createEmailVerification_primary_email({
                variables: { CreateEmailVerificationInputObject: create_email_verification_input_object }
            })
            // Send a approval code
            const create_email_verification_approval = {
                email: session.user.email,
            }
            createEmailVerification_approval({
                variables: { CreateEmailVerificationInputObject: create_email_verification_approval }
            })
        }
        /** Else If there is a recovery_email change */
        else if("recovery_email" in new_content) {
            // Send a verification for the new email
            const create_email_verification_input_object = {
                email: new_content.recovery_email,
            }
            createEmailVerification_recovery_email({
                variables: { CreateEmailVerificationInputObject: create_email_verification_input_object }
            })
            // Send a approval code
            const create_email_verification_approval = {
                email: session.user.email,
            }
            createEmailVerification_approval({
                variables: { CreateEmailVerificationInputObject: create_email_verification_approval }
            })
        }
        /** Else If its some other change that just needs a aproval code */
        else if(("password" in new_content) || ("token_key" in new_content)) {
            // Send a approval code
            const create_email_verification_approval = {
                email: session.user.email,
            }
            createEmailVerification_approval({
                variables: { CreateEmailVerificationInputObject: create_email_verification_approval }
            })
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
            <p>User details change.</p>
            <br/>
            {(createEmailVerificationData_primary_email || createEmailVerificationData_recovery_email || createEmailVerificationData_approval) ? (
                <>
                <div className={edits_styles.title_container}>
                    <b>Verifications</b>
                </div>
                <div className={edits_styles.body_container}>
                    {createEmailVerificationData_primary_email && <KeyValueBlock title="Primary Email">
                        <input type="text" name="primary_email_verification_code" value={userChangeVerificationInput.primary_email_verification_code} onChange={handleUserChangeVerificationInputChange} placeholder="Verification code..." required/>
                    </KeyValueBlock>}
                    {createEmailVerificationData_recovery_email && <KeyValueBlock title="Recovery Email">
                        <input type="text" name="recovery_email_verification_code" value={userChangeVerificationInput.recovery_email_verification_code} onChange={handleUserChangeVerificationInputChange} placeholder="Verification code..." required/>
                    </KeyValueBlock>}
                    {createEmailVerificationData_approval && <KeyValueBlock title="Approval Code">
                        <input type="text" name="approval_code" value={userChangeVerificationInput.approval_code} onChange={handleUserChangeVerificationInputChange} placeholder="Verification code..." required/>
                    </KeyValueBlock>}
                </div>
                <br/>
                <CustomButton align="vertical" onClick={handleUserChangeSubmit}>Resend verification codes</CustomButton>
                <br/>
                <hr className="hr_surface_color_1"/>
                <div className="button_fixed_width align_right">
                    <CustomButton align="vertical" onClick={handleUserVerificationInputSubmit} disabled={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email} busy={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email}>Update</CustomButton>
                </div>
                <br/>
                <BasicLink align="right" onClick={()=>{
                    createEmailVerificationReset_primary_email()
                    createEmailVerificationReset_recovery_email()
                    createEmailVerificationReset_approval()
                }}><IoMdArrowRoundBack/>Go back</BasicLink>
                </>
            ) : (
                <>
                <SectionBlockMinimizer heading="Current" start_state="false">
                    <p>This is the existing data that will be getting replaced.</p>
                    <br/>
                    <div className={styles.existing_content}>
                        {"fname" in existing_content && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="First Name">{existing_content.fname}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"lname" in existing_content && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="Last Name">{existing_content.lname}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"password" in existing_content && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="Password">{existing_content.password}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"primary_email" in existing_content && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="Primary Email">{existing_content.primary_email}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"recovery_email" in existing_content && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="Recovery Email">{existing_content.recovery_email}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"token_key" in existing_content && 
                            <EditableBlock title="Current">
                                <KeyValueBlock title="Token Key">{existing_content.token_key}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"notifications" in existing_content && 
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
                <br/>
                <SectionBlockMinimizer heading="New" start_state="true">
                    <p>This is the new data that will be replacing the existing.</p>
                    <br/>
                    <div className={styles.new_content}>
                        {"fname" in new_content && 
                            <EditableBlock title="New" onClick={() => {
                                router.push(`${location}/${stored_element.new_content.fname}`)
                            }}>
                                <KeyValueBlock title="First Name">{new_content.fname}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"lname" in new_content && 
                            <EditableBlock title="New" onClick={() => {
                                router.push(`${location}/${stored_element.new_content.lname}`)
                            }}>
                                <KeyValueBlock title="Last Name">{new_content.lname}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"password" in new_content && 
                            <EditableBlock title="New" onClick={() => {
                                router.push(`${location}/${stored_element.new_content.password}`)
                            }}>
                                <KeyValueBlock title="Password">{new_content.password?.length ? (repeat("*", new_content.password.length)) : (new_content.password)}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"primary_email" in new_content && 
                            <EditableBlock title="New" onClick={() => {
                                router.push(`${location}/${stored_element.new_content.primary_email}`)
                            }}>
                                <KeyValueBlock title="Primary Email">{new_content.primary_email}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"recovery_email" in new_content && 
                            <EditableBlock title="New" onClick={() => {
                                router.push(`${location}/${stored_element.new_content.recovery_email}`)
                            }}>
                                <KeyValueBlock title="Recovery Email">{new_content.recovery_email}</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"token_key" in new_content && 
                            <EditableBlock title="New">
                                <KeyValueBlock title="Token Key">A new key will be generated by the server.</KeyValueBlock>
                            </EditableBlock>
                        }
                        {"notifications" in new_content && 
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
                    <CustomButton align="vertical" onClick={handleUserChangeSubmit} disabled={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email || userChangeLoading} busy={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email || userChangeLoading}>Update</CustomButton>
                </div>
                </>
            )}
        </div>
    );
}
