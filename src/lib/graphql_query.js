import { gql } from '@apollo/client';

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