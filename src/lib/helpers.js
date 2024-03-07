import { v4 as uuidv4 } from 'uuid';

export const createShortUuid = (length) => {
    // Generate a UUID
    const uuid = uuidv4();
    // Remove hyphens and truncate to the desired length
    return uuid.replace(/-/g, '').substring(0, length);
};

export const isShortUuid = (input) => {
    if(typeof input == "string" && input.length == 10) return true
    return false
}

export const buildObject = (stored_element) => {
    if(!stored_element) return stored_element
    // If an object
    if(typeof stored_element.content == "object") {
        for(const key in stored_element.content) {
            if(isShortUuid(stored_element.content[key])) stored_element.content[key] = buildObject(JSON.parse(localStorage.getItem(stored_element.content[key])))
        }
    }
    return stored_element.content
}