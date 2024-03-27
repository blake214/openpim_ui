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
        temp_product_id
    }
}`;

export const ChangeTempProduct = gql`
mutation ChangeTempProduct($ChangeTempProductInputObject: ChangeTempProductInput!) {
    changeTempProduct( ChangeTempProductInput: $ChangeTempProductInputObject ) {
        temp_product_id
    }
}`;

export const CreateUnregisteredEntity = gql`
mutation CreateUnregisteredEntity($CreateUnregisteredEntityInputObject: CreateUnregisteredEntityInput!) {
    createUnregisteredEntity( CreateUnregisteredEntityInput: $CreateUnregisteredEntityInputObject ) {
        _id
    }
}`;

export const DeleteTempProduct = gql`
mutation DeleteTempProduct($DeleteTempProductInputObject: DeleteTempProductInput!) {
    deleteTempProduct( DeleteTempProductInput: $DeleteTempProductInputObject )
}`;

export const ApproveTempProduct = gql`
mutation ApproveTempProduct($ApproveTempProductInputObject: ApproveTempProductInput!) {
    approveTempProduct( ApproveTempProductInput: $ApproveTempProductInputObject ) {
        _id
    }
}`;

export const CreateProductChange = gql`
mutation CreateProductChange($CreateProductChangeInputObject: CreateProductChangeInput!) {
    createProductChange( CreateProductChangeInput: $CreateProductChangeInputObject ) {
        product_change_id
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
        notifications: $notifications
    }, UserChangeVerificationInput: {
        primary_email_verification_code: $primary_email_verification_code
        recovery_email_verification_code: $recovery_email_verification_code
        approval_code: $approval_code
    } ) {
        _id
    }
}`;
