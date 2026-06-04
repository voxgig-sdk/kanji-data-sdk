# KanjiData SDK

Look up readings, meanings, and stroke counts for 13,000+ Japanese kanji over a simple JSON API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Kanji Data API

[KanjiAPI](https://kanjiapi.dev/) exposes Japanese kanji data as a modern JSON API. The service describes itself as "Kanji data, accessible as a modern JSON API" and covers over 13,000 kanji characters.

What you get from the API:

- Per-character kanji lookups via `https://kanjiapi.dev/v1/kanji/{character}`
- Reading data and word entries grouped under the `/v1` namespace
- Common fields such as readings (on/kun), English meanings, and stroke counts

The API is served over HTTPS with CORS enabled, and the public catalogue listing reports no authentication or documented rate limits. Endpoints not surfaced in the fetched pages are intentionally omitted here.

## Try it

**TypeScript**
```bash
npm install kanji-data
```

**Python**
```bash
pip install kanji-data-sdk
```

**PHP**
```bash
composer require voxgig/kanji-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/kanji-data-sdk/go
```

**Ruby**
```bash
gem install kanji-data-sdk
```

**Lua**
```bash
luarocks install kanji-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { KanjiDataSDK } from 'kanji-data'

const client = new KanjiDataSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o kanji-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "kanji-data": {
      "command": "/abs/path/to/kanji-data-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Kanji** | A single Japanese kanji character resource, fetched per-character at `https://kanjiapi.dev/v1/kanji/{character}` and typically including readings, meanings, and stroke count. | `/kanji/{character}` |
| **Reading** | Reading-centric lookups (on'yomi or kun'yomi) grouped under the `/v1` namespace of the API. | `/reading/{reading}` |
| **Word** | Japanese word entries associated with kanji, served from the `/v1` namespace of the API. | `/words/{character}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from kanjidata_sdk import KanjiDataSDK

client = KanjiDataSDK({})


# Load a specific kanji
kanji, err = client.Kanji(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'kanjidata_sdk.php';

$client = new KanjiDataSDK([]);


// Load a specific kanji
[$kanji, $err] = $client->Kanji(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/kanji-data-sdk/go"

client := sdk.NewKanjiDataSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "KanjiData_sdk"

client = KanjiDataSDK.new({})


# Load a specific kanji
kanji, err = client.Kanji(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("kanji-data_sdk")

local client = sdk.new({})


-- Load a specific kanji
local kanji, err = client:Kanji(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = KanjiDataSDK.test()
const result = await client.Kanji().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = KanjiDataSDK.test(None, None)
result, err = client.Kanji(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = KanjiDataSDK::test(null, null);
[$result, $err] = $client->Kanji(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Kanji(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = KanjiDataSDK.test(nil, nil)
result, err = client.Kanji(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Kanji(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Kanji Data API

- Upstream: [https://kanjiapi.dev/](https://kanjiapi.dev/)

---

Generated from the Kanji Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
