"use client"

import styles from "@/app/(user)/style.module.css"
import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from "react-icons/io";
import { CreateEmailVerification, CreateUser } from "@/lib/graphql_mutation";
import BasicLink from "@/components/basic_link/basic_link";
import CustomButton from "@/components/custom_button/custom_button";

export default function RegisterPage() {
    // ======= Hooks
    const router = useRouter();
    // ======= Hooks

    // ======= GraphQL
    const [createEmailVerification_primary_email, { data: createEmailVerificationData_primary_email, loading: createEmailVerificationLoading_primary_email, error: createEmailVerificationError_primary_email, reset: createEmailVerificationReset_primary_email }] = useMutation(CreateEmailVerification);
    const [createEmailVerification_recovery_email, { data: createEmailVerificationData_recovery_email, loading: createEmailVerificationLoading_recovery_email, error: createEmailVerificationError_recovery_email, reset: createEmailVerificationReset_recovery_email }] = useMutation(CreateEmailVerification);
    const [createUser, { data: createUserData, loading: createUserLoading, error: createUserError }] = useMutation(CreateUser);
    // ======= GraphQL

    // ======= States
    const [createUserInput, setCreateUserInput] = useState({
        fname: 'Blake',
        lname: '',
        language_id: '',
        ui_theme_id: '',
        primary_email: 'blake@example.com',
        recovery_email: '',
        password: 'password',
        password_repeat: 'password',
    });
    const [createUserVerificationInput, setCreateUserVerificationInput] = useState({
        primary_email_verification_code: '',
        recovery_email_verification_code: ''
    });
    // ======= States

    // ======= Change Handlers
    const handleCreateUserInputChange = (e) => {
        const { name, value } = e.target;
        setCreateUserInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCreateUserVerificationInputChange = (e) => {
        const { name, value } = e.target;
        setCreateUserVerificationInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // ======= Change Handlers

    // ======= Event Handlers
    const handleUserInputSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match
        if(createUserInput.password !== createUserInput.password_repeat) return alert("passwords dont match")
        // Reset the states cor consistency
        createEmailVerificationReset_primary_email()
        createEmailVerificationReset_recovery_email()
        // Lets send the primary email verifications
        const create_email_verification_input_object = {
            email: createUserInput.primary_email,
        }
        createEmailVerification_primary_email({
            variables: { CreateEmailVerificationInputObject: create_email_verification_input_object }
        })
        // Lets send the recovery email verifications if exists
        if(createUserInput.recovery_email.length) {
            const create_email_verification_input_object = {
                email: createUserInput.recovery_email,
            }
            createEmailVerification_recovery_email({
                variables: { CreateEmailVerificationInputObject: create_email_verification_input_object }
            })
        }
    };
    const handleUserVerificationInputSubmit = (e) => {
        e.preventDefault();
        const create_user_input_object = {
            emails: {
                primary_email: createUserInput.primary_email,
                ...(createUserInput.recovery_email.length && { recovery_email: createUserInput.recovery_email })
            },
            name: {
                fname: createUserInput.fname,
                ...(createUserInput.fname.length && { fname: createUserInput.fname })
            },
            ...(createUserInput.language_id.length && { language_id: createUserInput.language_id }),
            ...(createUserInput.ui_theme_id.length && { ui_theme_id: createUserInput.ui_theme_id }),
            password: createUserInput.password,
        }
        const create_user_verification_input_object = {
            primary_email_verification_code: createUserVerificationInput.primary_email_verification_code,
            ...(createUserVerificationInput.recovery_email_verification_code.length && { recovery_email_verification_code: createUserVerificationInput.recovery_email_verification_code })
        }
        createUser({
            variables: {
                CreateUserInputObject: create_user_input_object,
                CreateUserVerificationInputObject: create_user_verification_input_object
            }
        })
    };
    // ======= Event Handlers

    // ======= Effects
    useEffect(() => {
        if(createUserData) router.push(`/login`);
    }, [createUserData]);
    // ======= Effects
    
    return (
        <div className={styles.container}>
            {(createEmailVerificationData_primary_email || createEmailVerificationData_recovery_email) ? (
                <div className={styles.form_container}>
                    <form onSubmit={handleUserVerificationInputSubmit}>
                        {createEmailVerificationData_primary_email && <>
                            <input 
                                placeholder="Primary verification code" 
                                type="text" 
                                onChange={handleCreateUserVerificationInputChange}
                                name="primary_email_verification_code"
                                value={createUserVerificationInput.primary_email_verification_code}
                                required
                            />
                            <br/>
                            <br/>
                        </>}
                        {createEmailVerificationData_recovery_email && <>
                            <input 
                                placeholder="Recovery verification code" 
                                type="text" 
                                onChange={handleCreateUserVerificationInputChange}
                                name="recovery_email_verification_code"
                                value={createUserVerificationInput.recovery_email_verification_code}
                                required
                            />
                            <br/>
                            <br/>
                        </>}
                        <CustomButton align="vertical" onClick={handleUserInputSubmit}>Resend verification code</CustomButton>
                        <br/>
                        <CustomButton align="vertical" type="submit" disabled={createUserLoading} busy={createUserLoading}>Register</CustomButton>
                        <br/>
                        <BasicLink align="right" onClick={()=>{
                            createEmailVerificationReset_primary_email()
                            createEmailVerificationReset_recovery_email()
                        }}><IoMdArrowRoundBack/>Go back</BasicLink>
                    </form>
                </div>
            ) : (
                <div className={styles.form_container}>
                    <form onSubmit={handleUserInputSubmit}>
                        <input 
                            placeholder="First Name"
                            type="text"
                            name="fname"
                            onChange={handleCreateUserInputChange}
                            value={createUserInput.fname}
                            required
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Last Name (optional)"
                            type="text"
                            name="lname"
                            onChange={handleCreateUserInputChange}
                            value={createUserInput.lname}
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Primary Email"
                            type="email"
                            name="primary_email"
                            onChange={handleCreateUserInputChange}
                            value={createUserInput.primary_email}
                            required
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Recovery Email (optional)"
                            type="email"
                            name="recovery_email"
                            onChange={handleCreateUserInputChange}
                            value={createUserInput.recovery_email}
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Password" 
                            type="password"
                            name="password"
                            onChange={handleCreateUserInputChange}
                            value={createUserInput.password}
                            required
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Repeat Password"
                            type="password"
                            name="password_repeat"
                            onChange={handleCreateUserInputChange}
                            value={createUserInput.password_repeat}
                            required
                        />
                        <br/>
                        <br/>
                        <CustomButton align="vertical" type="submit" disabled={(createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email)} busy={(createEmailVerificationLoading_primary_email || createEmailVerificationLoading_recovery_email)}>Register</CustomButton>
                        <br/>
                        <BasicLink href="/login" align="right"><IoMdArrowRoundBack /> Login</BasicLink>
                    </form>
                </div>
            )}
        </div>
    );
}