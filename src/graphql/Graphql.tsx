import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://127.0.0.1:9990/api/v1',
    cache: new InMemoryCache(),
});

export const SIGNUP_WITHOUT_CODE_MUTATION = gql`
    mutation Signup($nickname: String!, $email: String!, $password: String!) {
        authSignupWithoutCode(input: { nickname: $nickname, email: $email, password: $password })
    }
`;