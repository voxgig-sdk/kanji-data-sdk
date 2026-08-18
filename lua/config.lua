-- KanjiData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "KanjiData",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "heisig_en",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "jlpt",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "kanji",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kun_readings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "meanings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name_readings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "on_readings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "stroke_count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "unicode",
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
        ["fields"] = {},
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
            ["name"] = "meanings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "variants",
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
