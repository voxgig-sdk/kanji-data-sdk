<?php
declare(strict_types=1);

// KanjiData SDK utility: prepare_body

class KanjiDataPrepareBody
{
    public static function call(KanjiDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
