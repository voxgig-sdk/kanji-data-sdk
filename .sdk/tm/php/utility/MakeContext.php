<?php
declare(strict_types=1);

// KanjiData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KanjiDataMakeContext
{
    public static function call(array $ctxmap, ?KanjiDataContext $basectx): KanjiDataContext
    {
        return new KanjiDataContext($ctxmap, $basectx);
    }
}
