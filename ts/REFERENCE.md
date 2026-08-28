# KanjiData TypeScript SDK Reference

Complete API reference for the KanjiData TypeScript SDK.


## KanjiDataSDK

### Constructor

```ts
new KanjiDataSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KanjiDataSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = KanjiDataSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `KanjiDataSDK` instance in test mode.


### Instance Methods

#### `Kanji(data?: object)`

Create a new `Kanji` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KanjiEntity` instance.

#### `Reading(data?: object)`

Create a new `Reading` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReadingEntity` instance.

#### `Word(data?: object)`

Create a new `Word` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WordEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `KanjiDataSDK.test()`.

**Returns:** `KanjiDataSDK` instance in test mode.


---

## KanjiEntity

```ts
const kanji = client.Kanji()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grade` | `number` | No | School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji) |
| `heisig_en` | `string` | No | Heisig keyword in English |
| `id` | `string` | No |  |
| `jlpt` | `number` | No | JLPT (Japanese Language Proficiency Test) level (1-5) |
| `kanji` | `string` | No | The kanji character |
| `kun_readings` | `any[]` | No | Kun (Japanese) readings in hiragana |
| `meanings` | `any[]` | No | English meanings of the kanji |
| `name_readings` | `any[]` | No | Readings used in names |
| `on_readings` | `any[]` | No | On (Chinese-derived) readings in katakana |
| `stroke_count` | `number` | No | Number of strokes in the kanji |
| `unicode` | `string` | No | Unicode codepoint in hexadecimal |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Kanji().load({ id: 'kanji_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KanjiEntity` instance with the same client and
options.

#### `client()`

Return the parent `KanjiDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReadingEntity

```ts
const reading = client.Reading()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Reading().load({ id: 'reading_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReadingEntity` instance with the same client and
options.

#### `client()`

Return the parent `KanjiDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WordEntity

```ts
const word = client.Word()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `meanings` | `any[]` | No | Meanings of the word |
| `variants` | `any[]` | No | Different written and pronunciation variants |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Word().load({ id: 'word_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WordEntity` instance with the same client and
options.

#### `client()`

Return the parent `KanjiDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new KanjiDataSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

