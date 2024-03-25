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
        await new Promise(resolve => setTimeout(resolve, 5000));
        await signIn("credentials", { email, password });
    } catch(err) {
        /** Returning
         * If we encounter an error named "CredentialsSignin", which would be ANY error from the sigin, we return an object with the error key to the form that called this action. We can then handel the error within the component. (Unfortunatly we dont know what error we from the signIn, so if its a RateLimit we dont know, so we just return this error for any error we encounter)
         * Then notice we throw err, as with this signin, even if its successful it throws a REDIRECT error, fuck knows why. And we need to throw this to be able to redirect.
         * So in other words we will get a "CredentialsSignin" or "some redirect error" and we just catching the credentials one.
        */
        if (err.name.includes("CredentialsSignin")) return { error: "Invalid email or password" };
        throw err
    }
};