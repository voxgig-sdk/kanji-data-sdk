
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'KanjiData',
        slug: "kanji-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://kanjiapi.dev/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      kanji: {
      },

      reading: {
      },

      word: {
      },

    }
  }


  entity = {
    "kanji": {
      "fields": [
        {
          "name": "grade",
          "short": "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)",
          "type": "`$INTEGER`"
        },
        {
          "name": "heisig_en",
          "short": "Heisig keyword in English",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "jlpt",
          "short": "JLPT (Japanese Language Proficiency Test) level (1-5)",
          "type": "`$INTEGER`"
        },
        {
          "name": "kanji",
          "short": "The kanji character",
          "type": "`$STRING`"
        },
        {
          "name": "kun_readings",
          "short": "Kun (Japanese) readings in hiragana",
          "type": "`$ARRAY`"
        },
        {
          "name": "meanings",
          "short": "English meanings of the kanji",
          "type": "`$ARRAY`"
        },
        {
          "name": "name_readings",
          "short": "Readings used in names",
          "type": "`$ARRAY`"
        },
        {
          "name": "on_readings",
          "short": "On (Chinese-derived) readings in katakana",
          "type": "`$ARRAY`"
        },
        {
          "name": "stroke_count",
          "short": "Number of strokes in the kanji",
          "type": "`$INTEGER`"
        },
        {
          "name": "unicode",
          "short": "Unicode codepoint in hexadecimal",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/kanji/{character}",
              "parts": [
                "kanji",
                "{id}"
              ],
              "rename": {
                "param": {
                  "character": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "reading": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/reading/{reading}",
              "parts": [
                "reading",
                "{id}"
              ],
              "rename": {
                "param": {
                  "reading": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "word": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "meanings",
          "short": "Meanings of the word",
          "type": "`$ARRAY`"
        },
        {
          "name": "variants",
          "short": "Different written and pronunciation variants",
          "type": "`$ARRAY`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/words/{character}",
              "parts": [
                "words",
                "{id}"
              ],
              "rename": {
                "param": {
                  "character": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

