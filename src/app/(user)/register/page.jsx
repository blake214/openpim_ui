"use client"
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import CustomButton from "@/components/custom_button/custom_button";
import { gql, useMutation } from '@apollo/client';
import GoBackButton from "@/components/go_back_button/go_back_button";
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from "react-icons/io";
import BasicLink from "@/components/basic_link/basic_link";

const create_email_verification_mutation = gql`
    mutation CreateEmailVerification($CreateEmailVerificationInputObject: CreateEmailVerificationInput!) {
        createEmailVerification( CreateEmailVerificationInput: $CreateEmailVerificationInputObject ) {
            _id
        }
    }
`;

const create_user_mutation = gql`
    mutation CreateUser($CreateUserInputObject: CreateUserInput!, $CreateUserVerificationInputObject: CreateUserVerificationInput!) {
        createUser( CreateUserInput: $CreateUserInputObject, CreateUserVerificationInput: $CreateUserVerificationInputObject ) {
            _id
        }
    }
`;

export default function RegisterPage() {
    const router = useRouter();

    // ======= GraphQL
    const [createEmailVerification, { data: createEmailVerificationData, loading: createEmailVerificationLoading, error: createEmailVerificationError }] = useMutation(create_email_verification_mutation);
    const [createUser, { data: createUserData, loading: createUserLoading, error: createUserError }] = useMutation(create_user_mutation);
    // ======= GraphQL

    const [emalVerificationToggled, setEmalVerificationToggled] = useState(false);

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
    const handleCreateUserInputChange = (e) => {
        const { name, value } = e.target;
        setCreateUserInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [createUserVerificationInput, setCreateUserVerificationInput] = useState({
        primary_email_verification_code: '',
        recovery_email_verification_code: ''
    });
    const handleCreateUserVerificationInputChange = (e) => {
        const { name, value } = e.target;
        setCreateUserVerificationInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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

    const handleUserInputSubmit = (e) => {
        e.preventDefault();
        setEmalVerificationToggled(true)
        const create_email_verification_input_object = {
            email: createUserInput.primary_email,
        }
        createEmailVerification({
            variables: { CreateEmailVerificationInputObject: create_email_verification_input_object }
        })
    };

    useEffect(() => {
        if(createUserData && !createUserLoading) router.push(`/login`);
    }, [createUserData]);

    return (
        <div className={styles.container}>
            {(emalVerificationToggled && createEmailVerificationData && !createEmailVerificationLoading) ? (
                <div className={styles.form_container}>
                    <form onSubmit={handleUserVerificationInputSubmit}>
                        <input 
                            placeholder="Verification Code" 
                            type="text" 
                            onChange={handleCreateUserVerificationInputChange}
                            name="primary_email_verification_code"
                            value={createUserVerificationInput.primary_email_verification_code}
                            required
                        />
                        <br/>
                        <br/>
                        <CustomButton align_type="verticle" click_event={handleUserInputSubmit}>Resend Verifivation Codes</CustomButton>
                        <br/>
                        <br/>
                        <CustomButton align_type="verticle" type="submit">Register</CustomButton>
                        <br/>
                        <GoBackButton target="login" click_event={() => setEmalVerificationToggled(false)}/>
                    </form>
                </div>
            ) : (
                <div className={styles.form_container}>
                    <form onSubmit={handleUserInputSubmit}>
                        <input 
                            placeholder="First Name" 
                            type="text" 
                            onChange={handleCreateUserInputChange}
                            name="fname"
                            value={createUserInput.fname}
                            // required
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Email" 
                            type="email" 
                            onChange={handleCreateUserInputChange}
                            name="primary_email"
                            value={createUserInput.primary_email}
                            // required
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Password" 
                            type="password" 
                            onChange={handleCreateUserInputChange}
                            name="password"
                            value={createUserInput.password}
                            // required
                        />
                        <br/>
                        <br/>
                        <input 
                            placeholder="Repeat Password" 
                            type="password" 
                            onChange={handleCreateUserInputChange}
                            name="password_repeat"
                            value={createUserInput.password_repeat}
                            // required
                        />
                        <br/>
                        <br/>
                        <CustomButton align_type="verticle" type="submit">Register</CustomButton>
                        <br/>
                        <BasicLink item={{path:"/login", title:"Login"}} align="right"><IoMdArrowRoundBack /> Login</BasicLink>
                    </form>
                </div>
            )}
        </div>
    );
}