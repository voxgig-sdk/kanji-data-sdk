# Typed models for the KanjiData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Kanji(TypedDict, total=False):
    grade: int
    heisig_en: str
    id: str
    jlpt: int
    kanji: str
    kun_readings: list
    meanings: list
    name_readings: list
    on_readings: list
    stroke_count: int
    unicode: str


class KanjiLoadMatch(TypedDict):
    id: str


class Reading(TypedDict, total=False):
    id: str


class ReadingLoadMatch(TypedDict):
    id: str


class Word(TypedDict, total=False):
    id: str
    meanings: list
    variants: list


class WordLoadMatch(TypedDict):
    id: str
