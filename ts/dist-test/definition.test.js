"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "kanji",
        "accessor": "Kanji",
        "op": "load",
        "method": "GET",
        "path": "/kanji/{character}",
        "args": [
            {
                "name": "id",
                "wire": "character",
                "value": "猫"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "kanji": "猫",
            "grade": 8,
            "stroke_count": 11,
            "meanings": [
                "cat"
            ],
            "kun_readings": [
                "ねこ"
            ],
            "on_readings": [
                "ビョウ"
            ],
            "name_readings": [],
            "jlpt": 2,
            "unicode": "732b",
            "heisig_en": "cat"
        },
        "idField": "id"
    },
    {
        "entity": "reading",
        "accessor": "Reading",
        "op": "load",
        "method": "GET",
        "path": "/reading/{reading}",
        "args": [
            {
                "name": "id",
                "wire": "reading",
                "value": "ねこ"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "猫"
        ],
        "idField": "id"
    },
    {
        "entity": "word",
        "accessor": "Word",
        "op": "load",
        "method": "GET",
        "path": "/words/{character}",
        "args": [
            {
                "name": "id",
                "wire": "character",
                "value": "猫"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "meanings": [
                    {
                        "glosses": [
                            "cat"
                        ]
                    }
                ],
                "variants": [
                    {
                        "written": "猫",
                        "pronounced": "ねこ",
                        "priorities": [
                            "ichi1",
                            "news1",
                            "nf09"
                        ]
                    }
                ]
            }
        ],
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map