const { request, gql } = require('graphql-request');

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({ 
    providers: [ 
        GitHub({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }) 
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if(account.provider === "github") {
                try{
                    const login_user_mutation = gql`
                    mutation {
                        loginUser(LoginUserInput:{
                            email: "${user.email}"
                            password: "${process.env.AUTH_SECRET}"
                        }){
                            token
                        }
                    }`;
                    const data = await request('http://localhost:3001/graphql', login_user_mutation);
                    console.log("RESSSSSSSSSSSSSSSSSSSSSSS", data)
                    // We need to record this token somehow?
                    // We can just set the token here maybe? but then it doesnt sync with the github token?

                    return true
                } catch(err) {
                    // This means that there was an error registering the user
                    return false
                }
            }
            return false
        }
    }
})