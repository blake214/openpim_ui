"use client"

import EditProductTitle from "@/components/edits/edit_product_title";
import EditUserName from "@/components/edits/edit_user_name";
import EditUserNotifications from "@/components/edits/edit_user_notifications";

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
            {stored_element.edit_type == "product_title" && <EditProductTitle stored_element={stored_element} />}
            {stored_element.sub_type == "user_fname" && <EditUserName stored_element={stored_element} />}
            {stored_element.sub_type == "user_notifications" && <EditUserNotifications stored_element={stored_element} />}
        </div>
    );
}