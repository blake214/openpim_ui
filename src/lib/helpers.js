import { v4 as uuidv4 } from 'uuid';

export const createLocalUuidKey = (parent=null) => {
    // Generate a UUID
    const uuid = uuidv4();
    // Remove hyphens and truncate
    let key = uuid.replace(/-/g, '').substring(0, 10) + "_openpimkey"
    if(parent) return `${parent}-${key}`
    return key
};

export const isLocalUuidKey = (input) => {
    if(typeof input == "string" && input.includes("_openpimkey")) return true
    return false
}

export const buildContent = (stored_element, content_key="content") => {
    if(!stored_element) return stored_element
    // Check if local storage exists
    if(typeof localStorage == "undefined") return
    // If a key
    if(isLocalUuidKey(stored_element[content_key])) stored_element[content_key] = buildContent(JSON.parse(localStorage.getItem(stored_element[content_key])))
    // If an object
    if(typeof stored_element[content_key] == "object") {
        for(const key in stored_element[content_key]) {
            if(isLocalUuidKey(stored_element[content_key][key])) stored_element[content_key][key] = buildContent(JSON.parse(localStorage.getItem(stored_element[content_key][key])))
        }
        // This is a attribute graphql includes in some stuff for some reason
        if("__typename" in stored_element[content_key]) delete stored_element[content_key]["__typename"]
    }
    return stored_element[content_key]
}

export const cleanLocalStorage = () => {
    // Check if local storage exists
    if(typeof localStorage == "undefined") return
    // Keep some variables
    const openpim_token = localStorage.getItem('openpim_token');
    const theme = localStorage.getItem('theme');
    // Clear all local storage
    localStorage.clear();
    // Reset those variables
    if(openpim_token) localStorage.setItem('openpim_token', openpim_token);
    if(theme) localStorage.setItem('theme', theme);
}

/** Removes all children keys
 * So if a parent is xxxx
 * it will remove all children and sub children as xxxx_zzz and xxxx_zzz_aaa
*/
export const cleanLocalStorageChildrenKeys = (parent_key) => {
    // Check if local storage exists
    if(typeof localStorage == "undefined") return
    // Loop through all local storage items and find the children
    let children = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes(`${parent_key}-`)) children.push(key)
    }
    // Loop through children and delete (we have to seperate these steps else want working as expected)
    children.forEach(element => localStorage.removeItem(element));
}