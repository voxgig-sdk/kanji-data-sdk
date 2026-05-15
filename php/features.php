<?php
declare(strict_types=1);

// KanjiData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class KanjiDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new KanjiDataBaseFeature();
            case "test":
                return new KanjiDataTestFeature();
            default:
                return new KanjiDataBaseFeature();
        }
    }
}
