const { request, gql } = require('graphql-request');
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers: {GET, POST}, auth, signIn, signOut, update } = NextAuth({ 
    ...authConfig,
    providers: [ 
        GitHub({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const login_user_mutation = gql`
                    mutation {
                        loginUser(LoginUserInput:{
                            email: "${credentials.email}"
                            password: "${credentials.password}"
                        }){
                            user_id {
                                name {
                                    fname
                                    lname
                                }
                            }
                            token
                        }
                    }`;
                    const data = await request('http://localhost:3001/graphql', login_user_mutation);
                    if(!data?.loginUser?.token) throw new Error("Wrong credentials!");
                    return {
                        name: `${data.loginUser.user_id.name.fname} ${data.loginUser.user_id.name.lname}`,
                        email: credentials.email,
                        openPimToken: data.loginUser.token
                    }
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if(account.provider === "github") return true
            return true
        },
        ...authConfig.callbacks,
    }
})