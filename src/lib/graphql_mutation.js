import { gql } from '@apollo/client';

export const CreateEmailVerification = gql`
mutation CreateEmailVerification($CreateEmailVerificationInputObject: CreateEmailVerificationInput!) {
    createEmailVerification( CreateEmailVerificationInput: $CreateEmailVerificationInputObject ) {
        _id
    }
}`;

export const CreateUser = gql`
mutation CreateUser($CreateUserInputObject: CreateUserInput!, $CreateUserVerificationInputObject: CreateUserVerificationInput!) {
    createUser( CreateUserInput: $CreateUserInputObject, CreateUserVerificationInput: $CreateUserVerificationInputObject ) {
        _id
    }
}`;

export const CreateTempProduct = gql`
mutation CreateTempProduct($CreateTempProductInputObject: CreateTempProductInput!) {
    createTempProduct( CreateTempProductInput: $CreateTempProductInputObject ) {
        _id
    }
}`;

export const CreateUnregisteredEntity = gql`
mutation CreateUnregisteredEntity($CreateUnregisteredEntityInputObject: CreateUnregisteredEntityInput!) {
    createUnregisteredEntity( CreateUnregisteredEntityInput: $CreateUnregisteredEntityInputObject ) {
        _id
    }
}`;

/** Notes
 * Regarding these and the variables, currently i think its better to just have the entire object, as remember not all attributes are needed, and we cant just exclude things here.
 * The below is a special case as of now. Might change in the furture though
*/

export const UserChange = gql`
mutation UserChange(
    $fname: UserNameName,
    $lname: UserNameName, 
    $password: Password, 
    $primary_email: Email, 
    $recovery_email: Email, 
    $token_key: Boolean, 
    $logout_users: Boolean, 
    $language_id: LanguageKey, 
    $ui_theme_id: UiThemeKey, 
    $notifications: UserNoticiationsInput,
    $primary_email_verification_code: EmailVerificationCode,
    $recovery_email_verification_code: EmailVerificationCode,
    $approval_code: EmailVerificationCode
) {
    userChange( UserChangeInput: {
        fname: $fname
        lname: $lname
        password: $password
        primary_email: $primary_email
        recovery_email: $recovery_email
        token_key: $token_key
        logout_users: $logout_users
        language_id: $language_id
        ui_theme_id: $ui_theme_id
        notifications: $notifications
    }, UserChangeVerificationInput: {
        primary_email_verification_code: $primary_email_verification_code
        recovery_email_verification_code: $recovery_email_verification_code
        approval_code: $approval_code
    } ) {
        _id
    }
}`;
