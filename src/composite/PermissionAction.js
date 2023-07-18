export default class PermissionAction {
    #id;
    #title;

    constructor(id, title) {
        this.#id = id;
        this.#title = title;
    }

    findById(id) {
        if (this.#id !== id) {
            return null;
        }

        return this;
    }
}