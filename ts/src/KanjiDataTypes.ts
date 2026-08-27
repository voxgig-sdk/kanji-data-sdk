// Typed models for the KanjiData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Kanji {
  grade?: number
  heisig_en?: string
  id?: string
  jlpt?: number
  kanji?: string
  kun_readings?: any[]
  meanings?: any[]
  name_readings?: any[]
  on_readings?: any[]
  stroke_count?: number
  unicode?: string
}

export interface KanjiLoadMatch {
  id: string
}

export interface Reading {
  id?: string
}

export interface ReadingLoadMatch {
  id: string
}

export interface Word {
  id?: string
  meanings?: any[]
  variants?: any[]
}

export interface WordLoadMatch {
  id: string
}

