-- Typed models for the KanjiData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Kanji
---@field grade? number
---@field heisig_en? string
---@field jlpt? number
---@field kanji? string
---@field kun_readings? table
---@field meanings? table
---@field name_readings? table
---@field on_readings? table
---@field stroke_count? number
---@field unicode? string

---@class KanjiLoadMatch
---@field id string

---@class Reading

---@class ReadingLoadMatch
---@field id string

---@class Word
---@field meanings? table
---@field variants? table

---@class WordLoadMatch
---@field id string

local M = {}

return M
