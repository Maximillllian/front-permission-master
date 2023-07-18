import PermissionAction from "../composite/PermissionAction";
import PermissionGroup from "../composite/PermissionGroup";

const ACTION_KEY = "action";

function parsePermissions(permissionTree) {
    const permissions = [];

    for (const property in permissionTree) {
        permissions.push(...parsePermissionGroup(property, permissionTree[property]));
    }
    
    return permissions;
}

function parsePermissionGroup(id, value) {
    if (id === ACTION_KEY) {
        return parseActions(value);
    }

    const groups = parsePermissions(value);
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
