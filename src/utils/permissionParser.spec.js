import { parsePermissions } from './permissionParser';

const rootPermission = {
    "part1": {
        "part11": {
            "part111": {
                "part1111": {
                    "part11111": {
                        "action": {
                            "action1": 0,
                            "action2": 0,
                            "action3": 0,
                            "action4": 0,
                        }
                    },
                },
            },
            "part112": {

            },
        },
    },
    "action": {
        "action1": 0,
        "action2": 0,
    }
};

test("инит", () => {
    const parsed = parsePermissions(rootPermission);
    console.log({ parsed });
})