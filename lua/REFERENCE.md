# KanjiData Lua SDK Reference

Complete API reference for the KanjiData Lua SDK.


## KanjiDataSDK

### Constructor

```lua
local sdk = require("kanji-data_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Kanji(data)`

Create a new `Kanji` entity instance. Pass `nil` for no initial data.

#### `Reading(data)`

Create a new `Reading` entity instance. Pass `nil` for no initial data.

#### `Word(data)`

Create a new `Word` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## KanjiEntity

```lua
local kanji = client:Kanji(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grade` | `number` | No | School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji) |
| `heisig_en` | `string` | No | Heisig keyword in English |
| `jlpt` | `number` | No | JLPT (Japanese Language Proficiency Test) level (1-5) |
| `kanji` | `string` | No | The kanji character |
| `kun_readings` | `table` | No | Kun (Japanese) readings in hiragana |
| `meanings` | `table` | No | English meanings of the kanji |
| `name_readings` | `table` | No | Readings used in names |
| `on_readings` | `table` | No | On (Chinese-derived) readings in katakana |
| `stroke_count` | `number` | No | Number of strokes in the kanji |
| `unicode` | `string` | No | Unicode codepoint in hexadecimal |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Kanji():load({ id = "kanji_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KanjiEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReadingEntity

```lua
local reading = client:Reading(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Reading():load({ id = "reading_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReadingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WordEntity

```lua
local word = client:Word(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meanings` | `table` | No | Meanings of the word |
| `variants` | `table` | No | Different written and pronunciation variants |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Word():load({ id = "word_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WordEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

