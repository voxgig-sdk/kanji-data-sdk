<?php
declare(strict_types=1);

// KanjiData SDK exists test

require_once __DIR__ . '/../kanjidata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = KanjiDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
