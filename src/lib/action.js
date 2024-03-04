"use server";

const { signIn, signOut } = require("./auth");

export const handleGithubLogin = async (e) => {
    await signIn("github")
};

export const handleLogout = async (e) => {
    await signOut()
};