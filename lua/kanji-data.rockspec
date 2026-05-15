package = "voxgig-sdk-kanji-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/kanji-data-sdk.git"
}
description = {
  summary = "KanjiData SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["kanji-data_sdk"] = "kanji-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
