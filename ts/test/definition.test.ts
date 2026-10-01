import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
