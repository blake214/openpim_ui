import Dexie from 'dexie';

class openPIMDB extends Dexie {
    constructor() {
        super('openPIMDB');
        this.version(1).stores({
            files: '++id, key, name, file, no'
        });
    }
    /** clearList clears the DB of a particular key group */
    clearList(key) {
        return this.transaction('rw', this.files, () => {
            this.files.where('key').equals(key).delete()
        });
    }
}

export const db = new openPIMDB();