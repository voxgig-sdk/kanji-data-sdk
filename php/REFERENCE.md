# KanjiData PHP SDK Reference

Complete API reference for the KanjiData PHP SDK.


## KanjiDataSDK

### Constructor

```php
require_once __DIR__ . '/kanji-data_sdk.php';

$client = new KanjiDataSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## KanjiEntity

```php
$kanji = $client->Kanji();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grade` | ``$INTEGER`` | No |  |
| `heisig_en` | ``$STRING`` | No |  |
| `jlpt` | ``$INTEGER`` | No |  |
| `kanji` | ``$STRING`` | No |  |
| `kun_reading` | ``$ARRAY`` | No |  |
| `meaning` | ``$ARRAY`` | No |  |
| `name_reading` | ``$ARRAY`` | No |  |
| `on_reading` | ``$ARRAY`` | No |  |
| `stroke_count` | ``$INTEGER`` | No |  |
| `unicode` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Kanji()->load(["id" => "kanji_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): KanjiEntity`

Create a new `KanjiEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ReadingEntity

```php
$reading = $client->Reading();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Reading()->load(["id" => "reading_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ReadingEntity`

Create a new `ReadingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WordEntity

```php
$word = $client->Word();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meaning` | ``$ARRAY`` | No |  |
| `variant` | ``$ARRAY`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Word()->load(["id" => "word_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WordEntity`

Create a new `WordEntity` instance with the same client and
options.

#### `getName(): string`

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

