// Typed models for the KanjiData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Kanji {
  grade?: number
  heisig_en?: string
  jlpt?: number
  kanji?: string
  kun_reading?: any[]
  meaning?: any[]
  name_reading?: any[]
  on_reading?: any[]
  stroke_count?: number
  unicode?: string
}

export interface KanjiLoadMatch {
  id: string
}

export interface Reading {
}

export interface ReadingLoadMatch {
  id: string
}

export interface Word {
  meaning?: any[]
  variant?: any[]
}

export interface WordLoadMatch {
  id: string
}

