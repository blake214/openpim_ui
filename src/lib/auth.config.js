const { request, gql } = require('graphql-request');
import { NextResponse } from 'next/server';

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if(user?.openPimToken) token.openPimToken = user.openPimToken
            if(!token.openPimToken) {
                /** Log user in API and return that token */
                const login_user_mutation = gql`
                mutation {
                    loginUser(LoginUserInput:{
                        email: "${token.email}"
                        password: "${process.env.AUTH_SECRET}"
                    }){
                        token
                    }
                }`;
                const data = await request('http://localhost:3001/graphql', login_user_mutation);
                if(!data?.loginUser?.token) throw new Error("Couldnt log in, sorry")
                token.openPimToken= data.loginUser.token
            }
            return token; 
        },
        async session({ session, token }) {
            if(token?.openPimToken) session.user.openPimToken = token.openPimToken;
            return session;
        },
        authorized({ auth, request }) {
            // Check if user is logged in
            const user_logged_in = auth?.user?.openPimToken
            // Lets check what page the user is trying
            const tryingDashPage = request.nextUrl?.pathname.startsWith("/dash"); 
            const tryingLoginPage = request.nextUrl?.pathname.startsWith("/login");
            const tryingRegisterPage = request.nextUrl?.pathname.startsWith("/register");
            // If the user is logged in or not
            if(user_logged_in) {
                // Check if trying to access login and register page
                if(tryingLoginPage || tryingRegisterPage) return Response.redirect(new URL("/dash", request.nextUrl));
                // Get headers
                const requestHeaders = new Headers(request.headers)
                const authorization = requestHeaders.get("Authorization")
                // If authorization header doesnt exist, include it
                if(!authorization) {
                    const response = NextResponse.next({
                        request: { headers: requestHeaders },
                    })
                    response.headers.set('Authorization', auth.user.openPimToken)
                    return response
                }
                return true
            } else {
                // Check if trying to access restricted page
                if(tryingDashPage) return false
            }
            return true
        },
    },
};