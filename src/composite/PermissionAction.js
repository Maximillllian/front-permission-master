import { ACTION_TYPE } from "./constants";

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

    toObject() {
        return {
            id: this.#id,
            title: this.#title,
            type: ACTION_TYPE,
        };
    }

    getId() {
        return this.#id;
    }

    setTitle(title) {
        this.#title = title;
    }
}