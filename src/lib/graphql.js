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

export const AccountPageGetUser = gql`
query AccountPageGetUser {
    getUser {
        _id
        emails {
            primary_email
            recovery_email
        }
        password {
            password
            password_length
        }
        name {
            fname
            lname
        }
        token_key
        language_id
        ui_theme_id
        account_limits {
            rate_limit_scaler
            graphql_rate_limit_scaler
        }
        account_status {
            banned
            unban_date
            lifetime_banned
        }
        notifications {
            product_changes
            product_issues
            entity_changes
            entity_issues
            entity_product_links
        }
        score {
            score_value
            date_scored
        }
        payment_credits
    }
}`;