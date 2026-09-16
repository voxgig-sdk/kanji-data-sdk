# KanjiData SDK configuration

module KanjiDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "KanjiData",
        "slug" => "kanji-data",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://kanjiapi.dev/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "kanji" => {},
          "reading" => {},
          "word" => {},
        },
      },
      "entity" => {
        "kanji" => {
          "fields" => [
            {
              "name" => "grade",
              "short" => "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "heisig_en",
              "short" => "Heisig keyword in English",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "jlpt",
              "short" => "JLPT (Japanese Language Proficiency Test) level (1-5)",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "kanji",
              "short" => "The kanji character",
              "type" => "`$STRING`",
            },
            {
              "name" => "kun_readings",
              "short" => "Kun (Japanese) readings in hiragana",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "meanings",
              "short" => "English meanings of the kanji",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name_readings",
              "short" => "Readings used in names",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "on_readings",
              "short" => "On (Chinese-derived) readings in katakana",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "stroke_count",
              "short" => "Number of strokes in the kanji",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "unicode",
              "short" => "Unicode codepoint in hexadecimal",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "kanji",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "猫",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "character",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/kanji/{character}",
                  "rename" => {
                    "param" => {
                      "character" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "kanji",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "kanji",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "reading" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "reading",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "ねこ",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "reading",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/reading/{reading}",
                  "rename" => {
                    "param" => {
                      "reading" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "reading",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "reading",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "word" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "meanings",
              "short" => "Meanings of the word",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "variants",
              "short" => "Different written and pronunciation variants",
              "type" => "`$ARRAY`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "word",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "猫",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "character",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/words/{character}",
                  "rename" => {
                    "param" => {
                      "character" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "words",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "words",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    KanjiDataFeatures.make_feature(name)
  end
end
