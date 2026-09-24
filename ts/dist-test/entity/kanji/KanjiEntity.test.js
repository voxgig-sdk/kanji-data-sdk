"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('KanjiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KANJI_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KANJI_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KanjiDataSDK.test();
        const ent = testsdk.Kanji();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KANJI_DATA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'kanji.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "grade": { "a": true, "h": "Grade", "n": "grade", "r": false, "sh": "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)", "t": "`$INTEGER`", "key$": "grade", "index$": 0 }, "heisig_en": { "a": true, "h": "Heisig En", "n": "heisig_en", "r": false, "sh": "Heisig keyword in English", "t": "`$STRING`", "key$": "heisig_en", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "jlpt": { "a": true, "h": "Jlpt", "n": "jlpt", "r": false, "sh": "JLPT (Japanese Language Proficiency Test) level (1-5)", "t": "`$INTEGER`", "key$": "jlpt", "index$": 3 }, "kanji": { "a": true, "h": "Kanji", "n": "kanji", "r": false, "sh": "The kanji character", "t": "`$STRING`", "key$": "kanji", "index$": 4 }, "kun_readings": { "a": true, "h": "Kun Readings", "n": "kun_readings", "r": false, "sh": "Kun (Japanese) readings in hiragana", "t": "`$ARRAY`", "key$": "kun_readings", "index$": 5 }, "meanings": { "a": true, "h": "Meanings", "n": "meanings", "r": false, "sh": "English meanings of the kanji", "t": "`$ARRAY`", "key$": "meanings", "index$": 6 }, "name_readings": { "a": true, "h": "Name Readings", "n": "name_readings", "r": false, "sh": "Readings used in names", "t": "`$ARRAY`", "key$": "name_readings", "index$": 7 }, "on_readings": { "a": true, "h": "On Readings", "n": "on_readings", "r": false, "sh": "On (Chinese-derived) readings in katakana", "t": "`$ARRAY`", "key$": "on_readings", "index$": 8 }, "stroke_count": { "a": true, "h": "Stroke Count", "n": "stroke_count", "r": false, "sh": "Number of strokes in the kanji", "t": "`$INTEGER`", "key$": "stroke_count", "index$": 9 }, "unicode": { "a": true, "h": "Unicode", "n": "unicode", "r": false, "sh": "Unicode codepoint in hexadecimal", "t": "`$STRING`", "key$": "unicode", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "kanji", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /kanji/{character}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "猫", "k": "param", "n": "id", "or": "character", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/kanji/{character}", "q": { "exist": ["id"] }, "r": { "param": { "character": "id" } }, "s": [{ "lit": "kanji" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "kanji", "name__orig": "kanji", "Name": "Kanji", "name_": "kanji", "name-": "kanji", "NAME": "KANJI", "index$": 0 }, { "active": true, "entity": "kanji", "key$": "BasicKanjiFlow", "kind": "basic", "name": "BasicKanjiFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "kanji_ref01", "srcdatavar": "kanji_ref01_data", "suffix": "_dt0" }, "m": { "id": "kanji01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-kanji_ref01" } }], "index$": 0 }] }, 'Kanji', { "GET /kanji/{character}": { "protocol": "http", "operationId": "getKanji", "responses": { "200": { "description": "Successful response with kanji data", "content": { "application/json": { "schema": { "type": "object", "properties": { "kanji": { "type": "string", "description": "The kanji character", "key$": "kanji" }, "grade": { "type": "integer", "description": "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)", "nullable": true, "key$": "grade" }, "stroke_count": { "type": "integer", "description": "Number of strokes in the kanji", "key$": "stroke_count" }, "meanings": { "type": "array", "items": { "type": "string" }, "description": "English meanings of the kanji", "key$": "meanings" }, "kun_readings": { "type": "array", "items": { "type": "string" }, "description": "Kun (Japanese) readings in hiragana", "key$": "kun_readings" }, "on_readings": { "type": "array", "items": { "type": "string" }, "description": "On (Chinese-derived) readings in katakana", "key$": "on_readings" }, "name_readings": { "type": "array", "items": { "type": "string" }, "description": "Readings used in names", "key$": "name_readings" }, "jlpt": { "type": "integer", "description": "JLPT (Japanese Language Proficiency Test) level (1-5)", "nullable": true, "key$": "jlpt" }, "unicode": { "type": "string", "description": "Unicode codepoint in hexadecimal", "key$": "unicode" }, "heisig_en": { "type": "string", "description": "Heisig keyword in English", "nullable": true, "key$": "heisig_en" } }, "x-ref": "#/components/schemas/KanjiData", "index$": 0 }, "example": { "kanji": "猫", "grade": 8, "stroke_count": 11, "meanings": ["cat"], "kun_readings": ["ねこ"], "on_readings": ["ビョウ"], "name_readings": [], "jlpt": 2, "unicode": "732b", "heisig_en": "cat" } } } }, "404": { "description": "Kanji character not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "Kanji not found" } } } } }, "parameters": [{ "name": "character", "in": "path", "required": true, "description": "The kanji character to retrieve information for", "schema": { "type": "string", "example": "猫" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let kanji_ref01_data = Object.values(setup.data.existing.kanji)[0];
        // LOAD
        const kanji_ref01_ent = client.Kanji();
        const kanji_ref01_match_dt0 = {};
        kanji_ref01_match_dt0.id = kanji_ref01_data.id;
        const kanji_ref01_data_dt0 = (await kanji_ref01_ent.load(kanji_ref01_match_dt0)).data();
        (0, node_assert_1.default)(kanji_ref01_data_dt0.id === kanji_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/kanji/KanjiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KanjiDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['kanji01', 'kanji02', 'kanji03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KANJI_DATA_TEST_KANJI_ENTID': idmap,
        'KANJI_DATA_TEST_LIVE': 'FALSE',
        'KANJI_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['KANJI_DATA_TEST_KANJI_ENTID'];
    const live = 'TRUE' === env.KANJI_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KANJI_DATA_TEST_KANJI_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.KanjiDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.KANJI_DATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=KanjiEntity.test.js.map