import { v4 as uuidv4 } from 'uuid';

export const createShortUuid = () => {
    // Generate a UUID
    const uuid = uuidv4();
    // Remove hyphens and truncate
    return uuid.replace(/-/g, '').substring(0, 10) + "_openpimkey";
};

export const isShortUuid = (input) => {
    if(typeof input == "string" && input.includes("_openpimkey")) return true
    return false
}

export const buildContent = (stored_element, content_key="content") => {
    if(!stored_element) return stored_element
    // If a key
    if(isShortUuid(stored_element[content_key])) stored_element[content_key] = buildContent(JSON.parse(localStorage.getItem(stored_element[content_key])))
    // If an object
    if(typeof stored_element[content_key] == "object") {
        for(const key in stored_element[content_key]) {
            if(isShortUuid(stored_element[content_key][key])) stored_element[content_key][key] = buildContent(JSON.parse(localStorage.getItem(stored_element[content_key][key])))
        }
        // This is a attribute graphql includes in some stuff for some reason
        if("__typename" in stored_element[content_key]) delete stored_element[content_key]["__typename"]
    }
    return stored_element[content_key]
}