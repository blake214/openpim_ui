import { v4 as uuidv4 } from 'uuid';

export const createLocalUuidKey = (parent=null) => {
    // Generate a UUID
    const uuid = uuidv4();
    // Remove hyphens and truncate
    let key = uuid.replace(/-/g, '').substring(0, 10) + "_openpimkey"
    if(parent) return `${parent}-${key}`
    return key
};

export const createDatabaseUuidKey = () => {
    // Generate a UUID
    const uuid = uuidv4();
    // Remove hyphens and truncate
    return uuid.replace(/-/g, '').substring(0, 10)
};

/** isLocalUuidKey, checks if a string is a local storage key, this is useful when checking route paths */
export const isLocalUuidKey = (input) => {
    if(typeof input == "string" && input.includes("_openpimkey")) return true
    return false
}

/** mongoIdPath, checks if the path includes a mongoID
 * Returns either 'false' if not valid OR and returns the id and type as [id,type]
 */
export const mongoIdPath = (input) => {
    if(typeof input == "string") {
        const index = input.indexOf('_');
        const firstPart = index !== -1 ? input.substring(0, index) : input;
        const secondPart = index !== -1 ? input.substring(index + 1) : '';
        const mongo_id_regex = /^[0-9a-fA-F]{24}$/
        if(!mongo_id_regex.test(firstPart)) return false
        else return [firstPart, secondPart]
    }
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
        if(stored_element[content_key] && "__typename" in stored_element[content_key]) delete stored_element[content_key]["__typename"]
    }
    return stored_element[content_key]
}

export const removeTypeNameGraphQl = (element) => {
    if (!element || typeof element !== "object") return element;
    if (Array.isArray(element)) {
        return element.map(removeTypeNameGraphQl);
    }
    const newObj = {};
    for (const key in element) {
        if (key !== "__typename") newObj[key] = removeTypeNameGraphQl(element[key]);
    }
    return newObj;
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

export const readFileAsBlob = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(new Blob([reader.result], { type: file.type }));
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
};

/** clampValue
 * This function restricts a value to within a range
*/
export const clampValue = (number, min, max) => {
    return Math.min(Math.max(number, min), max);
}

/** mapValueRange
 * This function maps a value from one range to another
*/
export const mapValueRange = (value, oldMin, oldMax, newMin, newMax) => {
    const normalizedValue = (value - oldMin) / (oldMax - oldMin);
    return normalizedValue * (newMax - newMin) + newMin;;
}