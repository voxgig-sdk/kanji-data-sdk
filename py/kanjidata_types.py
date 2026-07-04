# Typed models for the KanjiData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Kanji:
    grade: Optional[int] = None
    heisig_en: Optional[str] = None
    jlpt: Optional[int] = None
    kanji: Optional[str] = None
    kun_reading: Optional[list] = None
    meaning: Optional[list] = None
    name_reading: Optional[list] = None
    on_reading: Optional[list] = None
    stroke_count: Optional[int] = None
    unicode: Optional[str] = None


@dataclass
class KanjiLoadMatch:
    id: str


@dataclass
class Reading:
    pass


@dataclass
class ReadingLoadMatch:
    id: str


@dataclass
class Word:
    meaning: Optional[list] = None
    variant: Optional[list] = None


@dataclass
class WordLoadMatch:
    id: str

