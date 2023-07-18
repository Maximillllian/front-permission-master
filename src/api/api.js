import {cloneObject} from "../utils/functions";

const rootPermissionTitles = {
    "part1": {
        "title": "Раздел 1",
        "items": {
            "part11": {
                "title": "Раздел 1.1",
                "items": {
                    "part111": {
                        "title": "Раздел 1.1.1",
                        "items": {
                            "part1111": {
                                "title": "Раздел 1.1.1.1",
                                "items": {
                                    "part11111": {
                                        "title": "Раздел 1.1.1.1.1"
                                    },
                                }
                            },
                        }
                    },
                    "part112": {
                        "title": "Раздел 1.1.2",
                    },
                }
            },
        }
    },
    "part2": {
        "title": "Раздел 2",
        "items": {
            "part21": {
                "title": "Раздел 2.1",
            },
        }
    },
};

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
                "action": {
                    "action1": 0,
                    "action2": 0,
                }
            },
        },
    },
    "part2": {
        "part21": {
            "action": {
                "action1": 0,
                "action2": 0,
                "action3": 0
            }
        },
    },
};

const data = {
    "data": {
        "rootPermissionTitles": rootPermissionTitles,
        "rootPermission": rootPermission
    }
};


export default class API {

    //Получение шаблонов прав доступа
    static getTemplates() {
        return Promise.resolve(data);
    }

    static createPermission(data = {}) {
        const checkPermission = cloneObject(rootPermission);
        let checkPermissionString = JSON.stringify(checkPermission);
        checkPermissionString = checkPermissionString.replaceAll('"action2":0', '"action2":1');

        console.log(JSON.stringify(data) === checkPermissionString);

        return JSON.stringify(data) === checkPermissionString;
    }
}
