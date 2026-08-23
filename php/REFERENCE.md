# KanjiData PHP SDK Reference

Complete API reference for the KanjiData PHP SDK.


## KanjiDataSDK

### Constructor

```php
require_once __DIR__ . '/kanjidata_sdk.php';

$client = new KanjiDataSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KanjiDataSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = KanjiDataSDK::test();
```


### Instance Methods

#### `Kanji($data = null)`

Create a new `KanjiEntity` instance. Pass `null` for no initial data.

#### `Reading($data = null)`

Create a new `ReadingEntity` instance. Pass `null` for no initial data.

#### `Word($data = null)`

Create a new `WordEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): KanjiDataUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## KanjiEntity

```php
$kanji = $client->Kanji();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grade` | `int` | No | School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji) |
| `heisig_en` | `string` | No | Heisig keyword in English |
| `jlpt` | `int` | No | JLPT (Japanese Language Proficiency Test) level (1-5) |
| `kanji` | `string` | No | The kanji character |
| `kun_readings` | `array` | No | Kun (Japanese) readings in hiragana |
| `meanings` | `array` | No | English meanings of the kanji |
| `name_readings` | `array` | No | Readings used in names |
| `on_readings` | `array` | No | On (Chinese-derived) readings in katakana |
| `stroke_count` | `int` | No | Number of strokes in the kanji |
| `unicode` | `string` | No | Unicode codepoint in hexadecimal |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Kanji()->load(["id" => "kanji_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): KanjiEntity`

Create a new `KanjiEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReadingEntity

```php
$reading = $client->Reading();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Reading()->load(["id" => "reading_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReadingEntity`

Create a new `ReadingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WordEntity

```php
$word = $client->Word();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meanings` | `array` | No | Meanings of the word |
| `variants` | `array` | No | Different written and pronunciation variants |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Word()->load(["id" => "word_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WordEntity`

Create a new `WordEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new KanjiDataSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

