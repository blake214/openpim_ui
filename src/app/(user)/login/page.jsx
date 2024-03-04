"use client"
import CustomButton from "@/components/custom_button/custom_button";
import styles from "./style.module.css"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { gql, useMutation } from '@apollo/client';
import GoBackButton from "@/components/go_back_button/go_back_button";
import { FaGithub } from "react-icons/fa";

const login_user_query = gql`
    mutation LoginUser($LoginUserInputObject: LoginUserInput!) {
        loginUser( LoginUserInput: $LoginUserInputObject ) {
            token
        }
    }
`;

export default function LoginPage() {
    const router = useRouter();

    // ======= GraphQL
    const [loginUser, { data: loginUserData, loading: loginUserLoading, error: loginUserError }] = useMutation(login_user_query);
    // ======= GraphQL

    const [loginUserInput, setLoginUserInput] = useState({
        email: 'blake@example.com',
        password: 'password',
    });
    const handleLoginUserInputChange = (e) => {
        const { name, value } = e.target;
        setLoginUserInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginUserInputSubmit = (e) => {
        e.preventDefault();
        const login_user_input_object = {
            email: loginUserInput.email,
            password: loginUserInput.password,
        }
        loginUser({
            variables: {
                LoginUserInputObject: login_user_input_object
            }
        });
    };

    useEffect(() => {
        if(loginUserData && !loginUserLoading) {
            localStorage.setItem('token', loginUserData.loginUser.token);
            router.push(`/dash`)
        }
    }, [loginUserData]);

    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <form onSubmit={handleLoginUserInputSubmit}>
                    <input 
                        placeholder="Email" 
                        type="email"
                        onChange={handleLoginUserInputChange}
                        name="email"
                        value={loginUserInput.email}
                        required
                    />
                    <br/>
                    <br/>
                    <input 
                        placeholder="Password" 
                        type="password"
                        onChange={handleLoginUserInputChange}
                        name="password"
                        value={loginUserInput.password}
                        required
                    />
                    <br/>
                    <br/>
                    <CustomButton align_type="verticle" type="submit">Login</CustomButton>
                    <br/>
                    <CustomButton align_type="verticle" type="submit"><FaGithub/>Login with github</CustomButton>
                    <br/>
                    <GoBackButton target="register" click_event={() => router.push(`/register`)}/>
                </form>
            </div>
        </div>
    );
}
