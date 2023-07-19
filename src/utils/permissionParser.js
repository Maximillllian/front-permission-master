import PermissionAction from "../composite/PermissionAction";
import PermissionGroup from "../composite/PermissionGroup";

const ACTION_KEY = "action";

function parsePermissions(permissionTree, titlesTree) {
    const permissions = parsePermissionGroups(permissionTree);
    const permissionGroup = new PermissionGroup(null, permissions);

    setTitles(titlesTree, permissionGroup);

    return permissionGroup;
}

function setTitles(titlesTree, permissionGroup) {
    for (const property in titlesTree) {
        const value = titlesTree[property];

        const group = permissionGroup.findById(property);
        console.log({ group: group.getId() })
        if (group) {
            console.log({ group: group.getId(), title: value.title, property });
            group.setTitle(value.title);
        }

        setTitles(value.items, permissionGroup);
    }
}

function parsePermissionGroups(permissionTree) {
    const permissions = [];

    for (const property in permissionTree) {
        permissions.push(...parsePermissionItem(property, permissionTree[property]));
    }
    
    return permissions;
}

function parsePermissionItem(id, value) {
    if (id === ACTION_KEY) {
        return parseActions(value);
    }

    const groups = parsePermissionGroups(value);
    return [new PermissionGroup(id, groups)];
}

function parseActions(actions) {
    return Object.entries(actions).map(([key, value]) => {
        return new PermissionAction(key, value);
    });
}

export {
    parsePermissions,
};
