<?php
declare(strict_types=1);

// KanjiData SDK utility: feature_add

class KanjiDataFeatureAdd
{
    public static function call(KanjiDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
