import EditUnregisteredEntityName from "@/components/edits/unregistered_entity/unregistered_entity_name";
import EditUnregisteredEntityTypes from "@/components/edits/unregistered_entity/unregistered_entity_types";
import EditProductTitle from "@/components/edits/products/edit_product_title";
import EditUserEmailsPrimaryEmail from "@/components/edits/users/edit_user_emails_primary_email";
import EditUserEmailsRecoveryEmail from "@/components/edits/users/edit_user_emails_recovery_email";
import EditUserNameFname from "@/components/edits/users/edit_user_name_fname";
import EditUserNameLname from "@/components/edits/users/edit_user_name_lname";
import EditUserNotifications from "@/components/edits/users/edit_user_notifications";
import EditUserPasswordPassword from "@/components/edits/users/edit_user_password_password";
import EditMediaAltText from "@/components/edits/media/edit_media_alt_text";
import EditMediaDescription from "@/components/edits/media/edit_media_description";
import EditMediaLanguageId from "@/components/edits/media/edit_media_language_id";
import EditVideoExternalUrl from "@/components/edits/videos/edit_video_external_url";
import EditVideoLoopable from "@/components/edits/videos/edit_video_loopable";
import EditMediaFiles from "@/components/edits/media/edit_media_files";
import EditImageCroppings from "@/components/edits/images/edit_image_croppings";
import EditImageCaptions from "@/components/edits/images/edit_image_captions";

export default function EditPage({stored_element, location, lastRoute, prevRoute}) {
    /** Checking what editing object it is
     * Here we check what object we editing, and use the correct component
    */
    return (
        <div>
            {/* General media objects */}
            {stored_element.sub_type == "media_alt_text" && <EditMediaAltText
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "media_description" && <EditMediaDescription
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "media_language_id" && <EditMediaLanguageId
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "media_files" && <EditMediaFiles
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}

            {/* Image objects */}
            {stored_element.sub_type == "image_croppings" && <EditImageCroppings
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "image_captions" && <EditImageCaptions
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}

            {/* Video objects */}
            {stored_element.sub_type == "video_external_url" && <EditVideoExternalUrl
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "video_loopable" && <EditVideoLoopable
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}

            {/* General objects */}
            {stored_element.sub_type == "unregistered_entity_name" && <EditUnregisteredEntityName
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "unregistered_entity_types" && <EditUnregisteredEntityTypes
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}

            {/* Product objects */}
            {stored_element.sub_type == "product_title" && <EditProductTitle
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}

            {/* User objects */}
            {stored_element.sub_type == "user_name_fname" && <EditUserNameFname
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "user_name_lname" && <EditUserNameLname
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "user_emails_primary_email" && <EditUserEmailsPrimaryEmail
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "user_emails_recovery_email" && <EditUserEmailsRecoveryEmail
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "user_password_password" && <EditUserPasswordPassword
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
            {stored_element.sub_type == "user_notifications" && <EditUserNotifications
                stored_element={stored_element}
                location={location}
                lastRoute={lastRoute}
                prevRoute={prevRoute}
            />}
        </div>
    );
}