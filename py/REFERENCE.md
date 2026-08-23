# KanjiData Python SDK Reference

Complete API reference for the KanjiData Python SDK.


## KanjiDataSDK

### Constructor

```python
from kanjidata_sdk import KanjiDataSDK

client = KanjiDataSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KanjiDataSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = KanjiDataSDK.test()
```


### Instance Methods

#### `Kanji(data=None)`

Create a new `KanjiEntity` instance. Pass `None` for no initial data.

#### `Reading(data=None)`

Create a new `ReadingEntity` instance. Pass `None` for no initial data.

#### `Word(data=None)`

Create a new `WordEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## KanjiEntity

```python
kanji = client.Kanji()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grade` | `int` | No | School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji) |
| `heisig_en` | `str` | No | Heisig keyword in English |
| `jlpt` | `int` | No | JLPT (Japanese Language Proficiency Test) level (1-5) |
| `kanji` | `str` | No | The kanji character |
| `kun_readings` | `list` | No | Kun (Japanese) readings in hiragana |
| `meanings` | `list` | No | English meanings of the kanji |
| `name_readings` | `list` | No | Readings used in names |
| `on_readings` | `list` | No | On (Chinese-derived) readings in katakana |
| `stroke_count` | `int` | No | Number of strokes in the kanji |
| `unicode` | `str` | No | Unicode codepoint in hexadecimal |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Kanji().load({"id": "kanji_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KanjiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReadingEntity

```python
reading = client.Reading()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Reading().load({"id": "reading_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReadingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WordEntity

```python
word = client.Word()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meanings` | `list` | No | Meanings of the word |
| `variants` | `list` | No | Different written and pronunciation variants |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Word().load({"id": "word_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WordEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = KanjiDataSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

