package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "KanjiData",
			"slug": "kanji-data",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://kanjiapi.dev/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"kanji": map[string]any{},
				"reading": map[string]any{},
				"word": map[string]any{},
			},
		},
		"entity": map[string]any{
			"kanji": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "grade",
						"short": "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "heisig_en",
						"short": "Heisig keyword in English",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "jlpt",
						"short": "JLPT (Japanese Language Proficiency Test) level (1-5)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "kanji",
						"short": "The kanji character",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kun_readings",
						"short": "Kun (Japanese) readings in hiragana",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "meanings",
						"short": "English meanings of the kanji",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name_readings",
						"short": "Readings used in names",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "on_readings",
						"short": "On (Chinese-derived) readings in katakana",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "stroke_count",
						"short": "Number of strokes in the kanji",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "unicode",
						"short": "Unicode codepoint in hexadecimal",
						"type": "`$STRING`",
					},
				},
				"name": "kanji",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "猫",
											"kind": "param",
											"name": "id",
											"orig": "character",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/kanji/{character}",
								"parts": []any{
									"kanji",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"character": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reading": map[string]any{
				"fields": []any{},
				"name": "reading",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "ねこ",
											"kind": "param",
											"name": "id",
											"orig": "reading",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/reading/{reading}",
								"parts": []any{
									"reading",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reading": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"word": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meanings",
						"short": "Meanings of the word",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "variants",
						"short": "Different written and pronunciation variants",
						"type": "`$ARRAY`",
					},
				},
				"name": "word",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "猫",
											"kind": "param",
											"name": "id",
											"orig": "character",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/words/{character}",
								"parts": []any{
									"words",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"character": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
