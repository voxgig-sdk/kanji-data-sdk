<?php
declare(strict_types=1);

// Typed models for the KanjiData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Kanji entity data model. */
class Kanji
{
    public ?int $grade = null;
    public ?string $heisig_en = null;
    public ?int $jlpt = null;
    public ?string $kanji = null;
    public ?array $kun_reading = null;
    public ?array $meaning = null;
    public ?array $name_reading = null;
    public ?array $on_reading = null;
    public ?int $stroke_count = null;
    public ?string $unicode = null;
}

/** Request payload for Kanji#load. */
class KanjiLoadMatch
{
    public string $id;
}

/** Reading entity data model. */
class Reading
{
}

/** Request payload for Reading#load. */
class ReadingLoadMatch
{
    public string $id;
}

/** Word entity data model. */
class Word
{
    public ?array $meaning = null;
    public ?array $variant = null;
}

/** Request payload for Word#load. */
class WordLoadMatch
{
    public string $id;
}

