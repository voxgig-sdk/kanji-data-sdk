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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Grade",
						"type": "`$INTEGER`",
						"short": "School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)",
					},
					map[string]any{
						"name": "heisig_en",
						"title": "Heisig En",
						"type": "`$STRING`",
						"short": "Heisig keyword in English",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "jlpt",
						"title": "Jlpt",
						"type": "`$INTEGER`",
						"short": "JLPT (Japanese Language Proficiency Test) level (1-5)",
					},
					map[string]any{
						"name": "kanji",
						"title": "Kanji",
						"type": "`$STRING`",
						"short": "The kanji character",
					},
					map[string]any{
						"name": "kun_readings",
						"title": "Kun Readings",
						"type": "`$ARRAY`",
						"short": "Kun (Japanese) readings in hiragana",
					},
					map[string]any{
						"name": "meanings",
						"title": "Meanings",
						"type": "`$ARRAY`",
						"short": "English meanings of the kanji",
					},
					map[string]any{
						"name": "name_readings",
						"title": "Name Readings",
						"type": "`$ARRAY`",
						"short": "Readings used in names",
					},
					map[string]any{
						"name": "on_readings",
						"title": "On Readings",
						"type": "`$ARRAY`",
						"short": "On (Chinese-derived) readings in katakana",
					},
					map[string]any{
						"name": "stroke_count",
						"title": "Stroke Count",
						"type": "`$INTEGER`",
						"short": "Number of strokes in the kanji",
					},
					map[string]any{
						"name": "unicode",
						"title": "Unicode",
						"type": "`$STRING`",
						"short": "Unicode codepoint in hexadecimal",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "kanji",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/kanji/{character}",
								"segments": []any{
									map[string]any{
										"lit": "kanji",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"kanji",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"character": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "character",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "猫",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "reading",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/reading/{reading}",
								"segments": []any{
									map[string]any{
										"lit": "reading",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"reading",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"reading": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "reading",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "ねこ",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meanings",
						"title": "Meanings",
						"type": "`$ARRAY`",
						"short": "Meanings of the word",
					},
					map[string]any{
						"name": "variants",
						"title": "Variants",
						"type": "`$ARRAY`",
						"short": "Different written and pronunciation variants",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "word",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/words/{character}",
								"segments": []any{
									map[string]any{
										"lit": "words",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"words",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"character": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "character",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "猫",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
