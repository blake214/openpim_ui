"use server";

const { signIn, signOut } = require("./auth");

export const handleGithubLogin = async (e) => {
    await signIn("github")
};

export const handleLogout = async (e) => {
    await signOut()
};

export const credentialsLogin = async (prevState, formData) => {
    const { email, password } = Object.fromEntries(formData);
    try {
        await signIn("credentials", { email, password });
    } catch(err) {
        // CANT DO THIS AS THE RATE LIMITER ALSO ACTIVATES THIS
        if (err.name.includes("CredentialsSignin")) return { error: "Invalid email or password" };
        throw err
    }
};