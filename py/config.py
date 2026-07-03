# KanjiData SDK configuration


def make_config():
    return {
        "main": {
            "name": "KanjiData",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://kanjiapi.dev/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "kanji": {},
                "reading": {},
                "word": {},
            },
        },
        "entity": {
      "kanji": {
        "fields": [
          {
            "active": True,
            "name": "grade",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "heisig_en",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "jlpt",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "kanji",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "kun_reading",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "meaning",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "name_reading",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "on_reading",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "stroke_count",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "unicode",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
        ],
        "name": "kanji",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "猫",
                      "kind": "param",
                      "name": "id",
                      "orig": "character",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/kanji/{character}",
                "parts": [
                  "kanji",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "character": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.kanji`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "reading": {
        "fields": [],
        "name": "reading",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "ねこ",
                      "kind": "param",
                      "name": "id",
                      "orig": "reading",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/reading/{reading}",
                "parts": [
                  "reading",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "reading": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "word": {
        "fields": [
          {
            "active": True,
            "name": "meaning",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "variant",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
        ],
        "name": "word",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "猫",
                      "kind": "param",
                      "name": "id",
                      "orig": "character",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/words/{character}",
                "parts": [
                  "words",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "character": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
