-- KanjiData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "KanjiData",
      slug = "kanji-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://kanjiapi.dev/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["kanji"] = {},
        ["reading"] = {},
        ["word"] = {},
      },
    },
    entity = {
      ["kanji"] = {
        ["fields"] = {
          {
            ["name"] = "grade",
            ["short"] = "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "heisig_en",
            ["short"] = "Heisig keyword in English",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "jlpt",
            ["short"] = "JLPT (Japanese Language Proficiency Test) level (1-5)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "kanji",
            ["short"] = "The kanji character",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kun_readings",
            ["short"] = "Kun (Japanese) readings in hiragana",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "meanings",
            ["short"] = "English meanings of the kanji",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name_readings",
            ["short"] = "Readings used in names",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "on_readings",
            ["short"] = "On (Chinese-derived) readings in katakana",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "stroke_count",
            ["short"] = "Number of strokes in the kanji",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "unicode",
            ["short"] = "Unicode codepoint in hexadecimal",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "kanji",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "猫",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "character",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/kanji/{character}",
                ["parts"] = {
                  "kanji",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["character"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["reading"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "reading",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "ねこ",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "reading",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/reading/{reading}",
                ["parts"] = {
                  "reading",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["reading"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["word"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "meanings",
            ["short"] = "Meanings of the word",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "variants",
            ["short"] = "Different written and pronunciation variants",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "word",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "猫",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "character",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/words/{character}",
                ["parts"] = {
                  "words",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["character"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
