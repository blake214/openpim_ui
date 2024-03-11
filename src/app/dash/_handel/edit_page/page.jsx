"use client"

import EditProductTitle from "@/components/edits/products/edit_product_title";
import EditUserEmailsPrimaryEmail from "@/components/edits/users/edit_user_emails_primary_email";
import EditUserEmailsRecoveryEmail from "@/components/edits/users/edit_user_emails_recovery_email";
import EditUserNameFname from "@/components/edits/users/edit_user_name_fname";
import EditUserNameLname from "@/components/edits/users/edit_user_name_lname";
import EditUserNotifications from "@/components/edits/users/edit_user_notifications";
import EditUserPasswordPassword from "@/components/edits/users/edit_user_password_password";

export default function EditPage({stored_element}) {
    /** Checking what editing object it is
     * Here we check what object we editing, and use the correct component
    */
    return (
        <div>
            <h1>Edit</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <p>Findout more</p>
            <br/>
            <br/>

            {/* Product objects */}
            {stored_element.edit_type == "product_title" && <EditProductTitle stored_element={stored_element} />}

            {/* User objects */}
            {stored_element.sub_type == "user_name_fname" && <EditUserNameFname stored_element={stored_element} />}
            {stored_element.sub_type == "user_name_lname" && <EditUserNameLname stored_element={stored_element} />}
            {stored_element.sub_type == "user_emails_primary_email" && <EditUserEmailsPrimaryEmail stored_element={stored_element} />}
            {stored_element.sub_type == "user_emails_recovery_email" && <EditUserEmailsRecoveryEmail stored_element={stored_element} />}
            {stored_element.sub_type == "user_password_password" && <EditUserPasswordPassword stored_element={stored_element} />}
            {stored_element.sub_type == "user_notifications" && <EditUserNotifications stored_element={stored_element} />}
        </div>
    );
}