"use client"
import { from, HttpLink, ApolloLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        const errorMessage = graphQLErrors.map(({ message }) => message).join(', ');
        alert(errorMessage)
    } 
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token') || null
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            ...(token && { authorization: token })
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
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;