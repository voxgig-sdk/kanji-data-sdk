
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Grade",
          "type": "`$INTEGER`",
          "short": "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)"
        },
        {
          "name": "heisig_en",
          "title": "Heisig En",
          "type": "`$STRING`",
          "short": "Heisig keyword in English"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "jlpt",
          "title": "Jlpt",
          "type": "`$INTEGER`",
          "short": "JLPT (Japanese Language Proficiency Test) level (1-5)"
        },
        {
          "name": "kanji",
          "title": "Kanji",
          "type": "`$STRING`",
          "short": "The kanji character"
        },
        {
          "name": "kun_readings",
          "title": "Kun Readings",
          "type": "`$ARRAY`",
          "short": "Kun (Japanese) readings in hiragana"
        },
        {
          "name": "meanings",
          "title": "Meanings",
          "type": "`$ARRAY`",
          "short": "English meanings of the kanji"
        },
        {
          "name": "name_readings",
          "title": "Name Readings",
          "type": "`$ARRAY`",
          "short": "Readings used in names"
        },
        {
          "name": "on_readings",
          "title": "On Readings",
          "type": "`$ARRAY`",
          "short": "On (Chinese-derived) readings in katakana"
        },
        {
          "name": "stroke_count",
          "title": "Stroke Count",
          "type": "`$INTEGER`",
          "short": "Number of strokes in the kanji"
        },
        {
          "name": "unicode",
          "title": "Unicode",
          "type": "`$STRING`",
          "short": "Unicode codepoint in hexadecimal"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "kanji",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/kanji/{character}",
              "segments": [
                {
                  "lit": "kanji"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "kanji",
                "{id}"
              ],
              "rename": {
                "param": {
                  "character": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "character",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "猫"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "reading",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/reading/{reading}",
              "segments": [
                {
                  "lit": "reading"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "reading",
                "{id}"
              ],
              "rename": {
                "param": {
                  "reading": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "reading",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "ねこ"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "meanings",
          "title": "Meanings",
          "type": "`$ARRAY`",
          "short": "Meanings of the word"
        },
        {
          "name": "variants",
          "title": "Variants",
          "type": "`$ARRAY`",
          "short": "Different written and pronunciation variants"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "word",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/words/{character}",
              "segments": [
                {
                  "lit": "words"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "words",
                "{id}"
              ],
              "rename": {
                "param": {
                  "character": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "character",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "猫"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
  config,
  FEATURE_PLUGINS,
}

