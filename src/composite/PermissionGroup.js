export default class PermissionGroup {
    #id;
    #title;
    #permissionItems;

    constructor(id, permissionItems) {
        this.#id = id;
        this.#permissionItems = permissionItems;
    }

    findById(id) {
        if (this.#id === id) {
            return this;
        }

        return this.#permissionItems.find(it => it.findById(id) != null);
    }
}