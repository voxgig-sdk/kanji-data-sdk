# KanjiData SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "grade",
            "type": "`$INTEGER`",
          },
          {
            "name": "heisig_en",
            "type": "`$STRING`",
          },
          {
            "name": "jlpt",
            "type": "`$INTEGER`",
          },
          {
            "name": "kanji",
            "type": "`$STRING`",
          },
          {
            "name": "kun_readings",
            "type": "`$ARRAY`",
          },
          {
            "name": "meanings",
            "type": "`$ARRAY`",
          },
          {
            "name": "name_readings",
            "type": "`$ARRAY`",
          },
          {
            "name": "on_readings",
            "type": "`$ARRAY`",
          },
          {
            "name": "stroke_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "unicode",
            "type": "`$STRING`",
          },
        ],
        "name": "kanji",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "猫",
                      "kind": "param",
                      "name": "id",
                      "orig": "character",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body`",
                },
              },
            ],
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
                "args": {
                  "params": [
                    {
                      "example": "ねこ",
                      "kind": "param",
                      "name": "id",
                      "orig": "reading",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "word": {
        "fields": [
          {
            "name": "meanings",
            "type": "`$ARRAY`",
          },
          {
            "name": "variants",
            "type": "`$ARRAY`",
          },
        ],
        "name": "word",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "猫",
                      "kind": "param",
                      "name": "id",
                      "orig": "character",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
