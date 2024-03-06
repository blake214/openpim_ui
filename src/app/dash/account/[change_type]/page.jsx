"use client"
import styles from "./style.module.css"
import KeyValueBlock from "@/components/key_value_block/key_value_block";
import CustomButton from "@/components/custom_button/custom_button";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useSearchParams } from 'next/navigation'

const user_details = {
    _id: "507f1f77bcf86cd799439012",
    emails: {
        primary_email: "blake@example.com",
        recovery_email: "recovery@example.com"
    },
    password: {
        password: "*********",
        password_length: 6
    },
    name: {
        fname: "Blake",
        lname: "Kellett"
    },
    token_key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJIZWxsbyB5b3UiLCJuYW1lIjoiV2h5IGFyZSB5b3UgY2hlY2tpbmcgbXkgdG9rZW4_ICggzaHCsCDNnMqWIM2hwrApIiwiaWF0IjoxNTE2MjM5MDIyfQ.yAP0xiTwp6vqIYbLKLVBRv-gTyMvU17rT3H8uErLjHA",
    language_id: "EN",
    ui_theme_id: "AANB",
    actions: {
        pending: [],
        positive_actions: [],
        negative_actions: [],
    },
    messages: [],
    temp_products: [],
    temp_entitys: [],
    account_limits: {
        rate_limit_scaler: 0,
        graphql_rate_limit_scaler: 0
    },
    account_status: {
        banned: false,
        unban_date: null,
        lifetime_banned: 0
    },
    token_date_valid: "1970-01-01T00:00:00.000Z",
    notifications: {
        product_changes: "AAPA",
        product_issues: "AAPA",
        entity_changes: "AAPA",
        entity_issues: "AAPA",
        entity_product_links: "AAPA",
    },
    score: {
        score_value: 400,
        date_scored: "1970-01-01T00:00:00.000Z",
    },
    payment_credits: 5.0,
    dates: {
        date_created: "1970-01-01T00:00:00.000Z",
        date_updated: "1970-01-01T00:00:00.000Z"
    },
}

export default function ChangeUser() {
    const searchParams = useSearchParams()
 
    const change_type = searchParams.get('change_type')
    const data_key = searchParams.get('data_key')
    console.log("change_type: ",change_type)
    console.log("data_key: ",data_key)



    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const updateUserDetails = () => {
        // <- Here we can perform the API update
        router.back(); // This will navigate the user back to the previous page
    };
    return (
        <div>
            <br/>
            <h1>Change</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <p>Findout more</p>
            <br/>
            <br/>
            <div className={styles.title_container}>
				<b>New</b>
			</div>
			<div className={styles.body_container}>
                <KeyValueBlock title="First Name">
                    <input className={styles.input_bar} type="text" name="email" value={formData.email} onChange={handleFormChange} placeholder="..."/>                   
                </KeyValueBlock>
			</div>
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="flex">
                <div className={`${styles.button_block} align_right`}>
                    <CustomButton align="verticle" onClick={updateUserDetails}>Save</CustomButton>
                </div>
            </div>
        </div>
    );
}