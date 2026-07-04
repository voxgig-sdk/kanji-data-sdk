# frozen_string_literal: true

# Typed models for the KanjiData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Kanji entity data model.
#
# @!attribute [rw] grade
#   @return [Integer, nil]
#
# @!attribute [rw] heisig_en
#   @return [String, nil]
#
# @!attribute [rw] jlpt
#   @return [Integer, nil]
#
# @!attribute [rw] kanji
#   @return [String, nil]
#
# @!attribute [rw] kun_reading
#   @return [Array, nil]
#
# @!attribute [rw] meaning
#   @return [Array, nil]
#
# @!attribute [rw] name_reading
#   @return [Array, nil]
#
# @!attribute [rw] on_reading
#   @return [Array, nil]
#
# @!attribute [rw] stroke_count
#   @return [Integer, nil]
#
# @!attribute [rw] unicode
#   @return [String, nil]
Kanji = Struct.new(
  :grade,
  :heisig_en,
  :jlpt,
  :kanji,
  :kun_reading,
  :meaning,
  :name_reading,
  :on_reading,
  :stroke_count,
  :unicode,
  keyword_init: true
)

# Request payload for Kanji#load.
#
# @!attribute [rw] id
#   @return [String]
KanjiLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Reading entity data model.
class Reading
end

# Request payload for Reading#load.
#
# @!attribute [rw] id
#   @return [String]
ReadingLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Word entity data model.
#
# @!attribute [rw] meaning
#   @return [Array, nil]
#
# @!attribute [rw] variant
#   @return [Array, nil]
Word = Struct.new(
  :meaning,
  :variant,
  keyword_init: true
)

# Request payload for Word#load.
#
# @!attribute [rw] id
#   @return [String]
WordLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

