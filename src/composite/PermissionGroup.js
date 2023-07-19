import { NODE_TYPE } from "./constants";

export default class PermissionGroup {
    #id;
    #title;
    #children = [];

    constructor(id, permissionItems) {
        this.#id = id;
        this.#children = permissionItems;
    }

    // TODO: отрефакторить
    findById(id) {
        if (this.#id === id) {
            console.log({ targetId: id, id: this.#id, this: this });
            return this;
        }

        if (!this.#children || this.#children.length === 0) {
            return null;
        }

        const targets = this.#children.map(it => it.findById(id)).filter(it => !!it);
        if (targets.length === 0) {
            return null;
        }

        return targets[0];
    }

    toObject() {
        return {
            id: this.#id,
            title: this.#title,
            children: this.#children.map(it => it.toObject()),
            type: NODE_TYPE,
        };
    }

    getChildren() {
        return this.#children;
    }

    getId() {
        return this.#id;
    }

    setTitle(title) {
        this.#title = title;
    }
}