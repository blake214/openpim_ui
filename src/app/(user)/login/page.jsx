"use client"

import styles from "@/app/(user)/style.module.css"
import { FaGithub } from "react-icons/fa";
import { credentialsLogin, handleGithubLogin } from "@/lib/action";
import { useFormState } from "react-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
import CustomButton from "@/components/custom_button/custom_button";
import BasicLink from "@/components/basic_link/basic_link";

export default function LoginPage() {
    // ======= Credentials Form
    const [credentialsLoginState, credentialsLoginAction] = useFormState(credentialsLogin, {
        email: 'blakekellett10@gmail.com',
        password: 'password',
    });
    if (credentialsLoginState?.error) alert(credentialsLoginState.error);
    // ======= Credentials Form
    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <form action={credentialsLoginAction}>
                    <input 
                        placeholder="Email" 
                        type="email"
                        name="email"
                        defaultValue={credentialsLoginState.email}
                        required
                    />
                    <br/>
                    <br/>
                    <input 
                        placeholder="Password" 
                        type="password"
                        name="password"
                        defaultValue={credentialsLoginState.password}
                        required
                    />
                    <br/>
                    <br/>
                    <CustomButton align="verticle" type="submit">Login</CustomButton>
                </form>
                <br/>
                <form action={handleGithubLogin}>
                    <CustomButton align="verticle" type="submit"><FaGithub/>Login with github</CustomButton>
                </form>
                <br/>
                <BasicLink href="/register" align="left"><IoMdArrowRoundForward /> Register account</BasicLink>
                <BasicLink href="/forgot_password" align="left"><IoMdArrowRoundForward /> Forgot password</BasicLink>
                <BasicLink href="/recover_account" align="left"><IoMdArrowRoundForward /> Recover account</BasicLink>
            </div>
        </div>
    );
}
