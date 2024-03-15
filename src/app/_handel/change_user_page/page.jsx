"use client"

import styles from "../style.module.css"
import { buildContent, cleanLocalStorageChildrenKeys } from '@/lib/helpers';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { CreateEmailVerification, UserChange } from "@/lib/graphql_mutation";
import { keyDictionary } from "@/lib/key_dictionary";
import { useSession } from "next-auth/react"
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomButton from '@/components/custom_button/custom_button';
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import BasicLink from "@/components/basic_link/basic_link";
import repeat from 'lodash/repeat';
import ContentBlock from "@/components/content_block/content_block";
import TableHorizontal from "@/components/table_horizontal/table_horizontal";


export default function ChangeUserPage({stored_element, location, lastRoute, prevRoute}) {
    // ======= Hooks
    const { data: session, status } = useSession()
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const new_content = buildContent(stored_element_temp, "new_content")
    const existing_content = buildContent(stored_element_temp, "existing_content")
    // ======= General

    // ======= GraphQL
    const [createEmailVerification_primary_email, { data: createEmailVerificationData_primary_email, loading: createEmailVerificationLoading_primary_email, error: createEmailVerificationError_primary_email, reset: createEmailVerificationReset_primary_email }] = useMutation(CreateEmailVerification);
    const [createEmailVerification_recovery_email, { data: createEmailVerificationData_recovery_email, loading: createEmailVerificationLoading_recovery_email, error: createEmailVerificationError_recovery_email, reset: createEmailVerificationReset_recovery_email }] = useMutation(CreateEmailVerification);
    const [createEmailVerification_approval, { data: createEmailVerificationData_approval, loading: createEmailVerificationLoading_approval, error: createEmailVerificationError_approval, reset: createEmailVerificationReset_approval }] = useMutation(CreateEmailVerification);
    const [userChange, { data: userChangeData, loading: userChangeLoading, error: userChangeError }] = useMutation(UserChange);
    // ======= GraphQL

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

    const handleUserVerificationInputSubmit = (e) => {
        e?.preventDefault();
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
        if(userChangeData) {
            // Clean the local storage
            cleanLocalStorageChildrenKeys(lastRoute)
            // Go back to prev route
            router.push(prevRoute)
        }
    }, [userChangeData]);
    // ======= Effects

    return (
        <div>
            <h1>Change User Details</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            {(createEmailVerificationData_primary_email || createEmailVerificationData_recovery_email || createEmailVerificationData_approval) ? (
                <>
                <ContentBlock title="Verifications" >
                    <TableHorizontal
                        tableContent= {[
                            createEmailVerificationData_primary_email && {
                                checked: false,
                                items: [
                                    {
                                        title: "Primary Email",
                                        content: [
                                            <input type="text" name="primary_email_verification_code" value={userChangeVerificationInput.primary_email_verification_code} onChange={handleUserChangeVerificationInputChange} placeholder="Verification code..." required/>
                                        ]
                                    }
                                ]
                            },
                            createEmailVerificationData_recovery_email && {
                                checked: false,
                                items: [
                                    {
                                        title: "Recovery Email",
                                        content: [
                                            <input type="text" name="recovery_email_verification_code" value={userChangeVerificationInput.recovery_email_verification_code} onChange={handleUserChangeVerificationInputChange} placeholder="Verification code..." required/>
                                        ]
                                    }
                                ]
                            },
                            createEmailVerificationData_approval && {
                                checked: false,
                                items: [
                                    {
                                        title: "Approval Code",
                                        content: [
                                            <input type="text" name="approval_code" value={userChangeVerificationInput.approval_code} onChange={handleUserChangeVerificationInputChange} placeholder="Verification code..." required/>
                                        ]
                                    }
                                ]
                            }                            
                        ].filter(Boolean)}
                    />
                </ContentBlock>
                <br/>
                <CustomButton component_type="vertical" onClick={handleUserChangeSubmit}>Resend verification codes</CustomButton>
                <br/>
                <hr className="hr_surface_color_1"/>
                <div className="button_fixed_width align_right">
                    <CustomButton component_type="vertical" onClick={handleUserVerificationInputSubmit} disabled={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email} busy={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email}>Update</CustomButton>
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
                            <ContentBlock title="Current" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "First Name",
                                                    content: [existing_content.fname]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"lname" in existing_content && 
                            <ContentBlock title="Current" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Last Name",
                                                    content: [existing_content.lname]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"password" in existing_content && 
                            <ContentBlock title="Current" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Password",
                                                    content: [existing_content.password]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"primary_email" in existing_content && 
                            <ContentBlock title="Current" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Primary Email",
                                                    content: [existing_content.primary_email]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"recovery_email" in existing_content &&
                            <ContentBlock title="Current" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Recovery Email",
                                                    content: [existing_content.recovery_email]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"token_key" in existing_content && 
                            <ContentBlock title="Current" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Token Key",
                                                    content: [<p>{existing_content.token_key}</p>]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }

                        {"notifications" in existing_content && 
                            <ContentBlock title="Current" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Product Changes",
                                                    content: [keyDictionary[existing_content.notifications.product_changes]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Product Issues",
                                                    content: [keyDictionary[existing_content.notifications.product_issues]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Entity Changes",
                                                    content: [keyDictionary[existing_content.notifications.entity_changes]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Entity Issues",
                                                    content: [keyDictionary[existing_content.notifications.entity_issues]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Entity Product Links",
                                                    content: [keyDictionary[existing_content.notifications.entity_product_links]]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                    </div>
                </SectionBlockMinimizer>
                <br/>
                <SectionBlockMinimizer heading="New" start_state="true">
                    <p>This is the new data that will be replacing the existing.</p>
                    <br/>
                    <div className={styles.new_content}>
                        {"fname" in new_content && 
                            <ContentBlock title="New" editClick={() => {
                                router.push(`${location}/${stored_element.new_content.fname}`)
                            }}>
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "First Name",
                                                    content: [new_content.fname]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"lname" in new_content && 
                            <ContentBlock title="New" editClick={() => {
                                router.push(`${location}/${stored_element.new_content.lname}`)
                            }}>
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Last Name",
                                                    content: [new_content.lname]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"password" in new_content && 
                            <ContentBlock title="New" editClick={() => {
                                router.push(`${location}/${stored_element.new_content.password}`)
                            }}>
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Password",
                                                    content: [new_content.password?.length ? (repeat("*", new_content.password.length)) : (new_content.password)]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"primary_email" in new_content && 
                            <ContentBlock title="New" editClick={() => {
                                router.push(`${location}/${stored_element.new_content.primary_email}`)
                            }}>
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Primary Email",
                                                    content: [new_content.primary_email]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"recovery_email" in new_content && 
                            <ContentBlock title="New" editClick={() => {
                                router.push(`${location}/${stored_element.new_content.recovery_email}`)
                            }}>
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Recovery Email",
                                                    content: [new_content.recovery_email]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"token_key" in new_content && 
                            <ContentBlock title="New" >
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Token Key",
                                                    content: [<p>A new key will be generated by the server.</p>]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                        {"notifications" in new_content && 
                            <ContentBlock title="New" editClick={() => {
                                router.push(`${location}/${stored_element.new_content.notifications}`)
                            }}>
                                <TableHorizontal
                                    tableContent= {[
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Product Changes",
                                                    content: [keyDictionary[new_content.notifications.product_changes]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Product Issues",
                                                    content: [keyDictionary[new_content.notifications.product_issues]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Entity Changes",
                                                    content: [keyDictionary[new_content.notifications.entity_changes]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Entity Issues",
                                                    content: [keyDictionary[new_content.notifications.entity_issues]]
                                                }
                                            ]
                                        },
                                        {
                                            checked: false,
                                            items: [
                                                {
                                                    title: "Entity Product Links",
                                                    content: [keyDictionary[new_content.notifications.entity_product_links]]
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </ContentBlock>
                        }
                    </div>
                </SectionBlockMinimizer>
                <br/>
                <hr className="hr_surface_color_1"/>
                <div className="button_fixed_width align_right">
                    <CustomButton component_type="vertical" onClick={handleUserChangeSubmit} disabled={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email || userChangeLoading} busy={createEmailVerificationLoading_approval || createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email || userChangeLoading}>Update</CustomButton>
                </div>
                </>
            )}
        </div>
    );
}
