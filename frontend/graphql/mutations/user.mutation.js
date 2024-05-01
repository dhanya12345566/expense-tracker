import { gql } from "@apollo/client";

// SIGN_UP mutation:
// - Allows a new user to sign up to the application.
// - Takes an input object containing the user's sign-up details (username, password, etc.).
// - Returns the new user's ID, name, and username if the operation is successful.
export const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
            _id
            name
            username
        }
    }
`;

// LOGIN mutation:
// - Authenticates a user and logs them in to the application.
// - Takes an input object containing the user's login credentials (username and password).
// - Returns the user's ID, name, and username if the operation is successful.
export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            _id
            name
            username
        }
    }
`;

// LOGOUT mutation:
// - Logs out the user from the application.
// - No input parameters are required.
// - Returns a message indicating the success of the logout operation.
export const LOGOUT = gql`
    mutation Logout {
        logout {
            message
        }
    }
`;
