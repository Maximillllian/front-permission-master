import PermissionAction from "../composite/PermissionAction";
import PermissionGroup from "../composite/PermissionGroup";
import { parsePermissions } from "./permissionParser";

const rootPermission = {
    part1: {
        part11: {
            action: {
                action1: 0,
                action2: 0,
                action3: 0,
                action4: 0,
            },
            part112: {
                action: {
                    action1: 0,
                    action2: 0,
                    action3: 0,
                    action4: 0,
                },
            },
        },
    },
    action: {
        action1: 0,
        action2: 0,
    },
};

const rootPermissionTitles = {
    part1: {
        title: "Раздел 1",
        items: {
            part11: {
                title: "Раздел 1.1",
                items: {
                    part112: {
                        title: "Раздел 1.1.2",
                    },
                },
            },
        },
    },
};

const emptyTitles = {};

describe("парсинг действия", () => {
    const actionPermission = {
        action: {
            action1: 0,
            action2: 0,
        },
    };

    test("парсится правильное количество действий", () => {
        const parsed = parsePermissions(actionPermission, emptyTitles);
        expect(parsed.getChildren().length).toBe(2);
    });

    test("парсятся в корректные классы", () => {
        const parsed = parsePermissions(actionPermission, emptyTitles);
        expect(parsed.getChildren()[0]).toBeInstanceOf(PermissionAction);
    });

    test("проставляются айдишники", () => {
        const parsed = parsePermissions(actionPermission, emptyTitles);
        const actions = parsed.getChildren();

        expect(actions[0].getId()).toBe("action1");
        expect(actions[1].getId()).toBe("action2");
    });
});

describe("парсинг узла", () => {
    const nodePermission = {
        part1: {
            part2: {},
            part3: {},
        },
    };

    test("парсится правильное количество узлов", () => {
        const parsed = parsePermissions(nodePermission, emptyTitles);
        expect(parsed.getChildren().length).toBe(1);

        const partOne = parsed.getChildren()[0];
        expect(partOne.getChildren().length).toBe(2);
    });

    test("парсятся в корректные классы", () => {
        const parsed = parsePermissions(nodePermission, emptyTitles);
        expect(parsed.getChildren()[0]).toBeInstanceOf(PermissionGroup);
    });

    test("проставляются айдишники", () => {
        const parsed = parsePermissions(nodePermission, emptyTitles);
        const partOne = parsed.getChildren()[0];

        expect(partOne.getId()).toBe("part1");

        const children = partOne.getChildren();
        expect(children[0].getId()).toBe("part2");
        expect(children[1].getId()).toBe("part3");
    });
});

describe("узел и действия", () => {
    const rootPermission = {
        part1: {
            part2: {},
            part3: {},
        },
        action: {
            action1: 0,
            action2: 0,
        },
    };

    test("парсится правильное количество узлов", () => {
        const parsed = parsePermissions(rootPermission, emptyTitles);
        expect(parsed.getChildren().length).toBe(3);

        const partOne = parsed.getChildren()[0];
        expect(partOne.getChildren().length).toBe(2);
    });

    test("парсятся в корректные классы", () => {
        const parsed = parsePermissions(rootPermission, emptyTitles);
        expect(parsed.getChildren()[0]).toBeInstanceOf(PermissionGroup);
        expect(parsed.getChildren()[1]).toBeInstanceOf(PermissionAction);
    });

    describe("проставляются айдишники", () => {
        test("у действий", () => {
            const parsed = parsePermissions(rootPermission, emptyTitles);
            const actions = parsed.getChildren();

            expect(actions[1].getId()).toBe("action1");
            expect(actions[2].getId()).toBe("action2");
        });

        test("у узлов", () => {
            const parsed = parsePermissions(rootPermission, emptyTitles);
            const partOne = parsed.getChildren()[0];

            expect(partOne.getId()).toBe("part1");

            const children = partOne.getChildren();
            expect(children[0].getId()).toBe("part2");
            expect(children[1].getId()).toBe("part3");
        });
    });

    test("проставляются айдишники", () => {
        const parsed = parsePermissions(rootPermission, emptyTitles);
        const partOne = parsed.getChildren()[0];

        expect(partOne.getId()).toBe("part1");

        const children = partOne.getChildren();
        expect(children[0].getId()).toBe("part2");
        expect(children[1].getId()).toBe("part3");
    });
});

test("инит", () => {
    const parsed = parsePermissions(rootPermission, rootPermissionTitles);
    console.log(JSON.stringify(parsed.toObject()));
});
