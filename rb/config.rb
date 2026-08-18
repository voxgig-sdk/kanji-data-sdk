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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$INTEGER`",
            },
            {
              "name" => "heisig_en",
              "type" => "`$STRING`",
            },
            {
              "name" => "jlpt",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "kanji",
              "type" => "`$STRING`",
            },
            {
              "name" => "kun_readings",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "meanings",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name_readings",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "on_readings",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "stroke_count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "unicode",
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "kanji",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "character" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "reading" => {
          "fields" => [],
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
                  "parts" => [
                    "reading",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "reading" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
              "name" => "meanings",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "variants",
              "type" => "`$ARRAY`",
            },
          ],
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
                  "parts" => [
                    "words",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "character" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
