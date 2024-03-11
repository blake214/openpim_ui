"use client"
import { from, HttpLink, ApolloLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { handleLogout } from "@/lib/action";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        // Logout if a 401 error
        graphQLErrors.map(error => {
            if(error.statusCode == 401) handleLogout()
        })
        const errorMessage = graphQLErrors.map(({ message }) => message).join(', ');
        alert(errorMessage)
    } 
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const openpim_token = localStorage.getItem('openpim_token') || null
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            ...(openpim_token && { authorization: openpim_token })
        }
    }));
    return forward(operation);
})

// This is the concatenated links
const additiveLink = from([
    errorLink,
    authMiddleware,
    new HttpLink({ uri: 'http://localhost:3001/graphql' })
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: additiveLink
});

const ApolloAppProvider = ({ children }) => {
    const { data: session, status } = useSession()
    // ======= Effects
    useEffect(() => {
        if(session?.user?.openPimToken) {
            const openpim_token = localStorage.getItem('openpim_token') || null
            if(!openpim_token) localStorage.setItem('openpim_token', session.user.openPimToken)
        } else {
            // Remove any existing tokens
            localStorage.removeItem('openpim_token')
        }
    }, []);
    // ======= Effects
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;