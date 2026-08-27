<?php
declare(strict_types=1);

// Word entity test

require_once __DIR__ . '/../kanjidata_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WordEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = KanjiDataSDK::test(null, null);
        $ent = $testsdk->Word(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = word_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "word." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set KANJI_DATA_TEST_WORD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $word_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.word")));
        $word_ref01_data = null;
        if (count($word_ref01_data_raw) > 0) {
            $word_ref01_data = Helpers::to_map($word_ref01_data_raw[0][1]);
        }

        // LOAD
        $word_ref01_ent = $client->Word(null);
        $word_ref01_match_dt0 = [
            "id" => $word_ref01_data["id"],
        ];
        $word_ref01_data_dt0_loaded = $word_ref01_ent->load($word_ref01_match_dt0, null);
        $word_ref01_data_dt0_load_result = Helpers::to_map(is_object($word_ref01_data_dt0_loaded) && method_exists($word_ref01_data_dt0_loaded, 'data_get') ? $word_ref01_data_dt0_loaded->data_get() : $word_ref01_data_dt0_loaded);
        $this->assertNotNull($word_ref01_data_dt0_load_result);
        $this->assertEquals($word_ref01_data_dt0_load_result["id"], $word_ref01_data["id"]);

    }
}

function word_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/word/WordTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = KanjiDataSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["word01", "word02", "word03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("KANJI_DATA_TEST_WORD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "KANJI_DATA_TEST_WORD_ENTID" => $idmap,
        "KANJI_DATA_TEST_LIVE" => "FALSE",
        "KANJI_DATA_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["KANJI_DATA_TEST_WORD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["KANJI_DATA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new KanjiDataSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["KANJI_DATA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["KANJI_DATA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
