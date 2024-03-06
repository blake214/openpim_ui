"use client"
import CustomButton from "@/components/custom_button/custom_button";
import styles from "./style.module.css"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { credentialsLogin, handleGithubLogin } from "@/lib/action";
import { useFormState } from "react-dom";
import BasicLink from "@/components/basic_link/basic_link";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function LoginPage() {
    const router = useRouter();
    const [loginUserInput, setLoginUserInput] = useState({
        email: 'blakekellett10@gmail.com',
        password: 'password',
    });
    const handleLoginUserInputChange = (e) => {
        const { name, value } = e.target;
        setLoginUserInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [credentialsLoginState, credentialsLoginAction] = useFormState(credentialsLogin, undefined);

    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <form action={credentialsLoginAction}>
                    <input 
                        placeholder="Email" 
                        type="email"
                        name="email"
                        onChange={handleLoginUserInputChange}
                        value={loginUserInput.email}
                        required
                    />
                    <br/>
                    <br/>
                    <input 
                        placeholder="Password" 
                        type="password"
                        name="password"
                        onChange={handleLoginUserInputChange}
                        value={loginUserInput.password}
                        required
                    />
                    <br/>
                    <br/>
                    <CustomButton align_type="verticle" type="submit">Login</CustomButton>
                    {credentialsLoginState?.error}
                </form>
                <br/>
                <form action={handleGithubLogin}>
                    <CustomButton align_type="verticle" type="submit"><FaGithub/>Login with github</CustomButton>
                </form>
                <br/>
                <BasicLink item={{path:"/register", title:"Register"}} align="left"><IoMdArrowRoundForward /> Register account</BasicLink>
                <BasicLink item={{path:"/forgot_password", title:"Forgot password"}} align="left"><IoMdArrowRoundForward /> Forgot password</BasicLink>
                <BasicLink item={{path:"/recover_account", title:"Recover account"}} align="left"><IoMdArrowRoundForward /> Recover account</BasicLink>
            </div>
        </div>
    );
}
