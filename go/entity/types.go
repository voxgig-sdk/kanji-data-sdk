// Typed models for the KanjiData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/kanji-data-sdk/go/core"
)

// Kanji is the typed data model for the kanji entity.
type Kanji struct {
	Grade *int `json:"grade,omitempty"`
	HeisigEn *string `json:"heisig_en,omitempty"`
	Jlpt *int `json:"jlpt,omitempty"`
	Kanji *string `json:"kanji,omitempty"`
	KunReadings *[]any `json:"kun_readings,omitempty"`
	Meanings *[]any `json:"meanings,omitempty"`
	NameReadings *[]any `json:"name_readings,omitempty"`
	OnReadings *[]any `json:"on_readings,omitempty"`
	StrokeCount *int `json:"stroke_count,omitempty"`
	Unicode *string `json:"unicode,omitempty"`
}

// KanjiLoadMatch is the typed request payload for Kanji.LoadTyped.
type KanjiLoadMatch struct {
	Id string `json:"id"`
}

// Reading is the typed data model for the reading entity.
type Reading struct {
}

// ReadingLoadMatch is the typed request payload for Reading.LoadTyped.
type ReadingLoadMatch struct {
	Id string `json:"id"`
}

// Word is the typed data model for the word entity.
type Word struct {
	Meanings *[]any `json:"meanings,omitempty"`
	Variants *[]any `json:"variants,omitempty"`
}

// WordLoadMatch is the typed request payload for Word.LoadTyped.
type WordLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
