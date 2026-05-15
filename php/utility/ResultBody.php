<?php
declare(strict_types=1);

// KanjiData SDK utility: result_body

class KanjiDataResultBody
{
    public static function call(KanjiDataContext $ctx): ?KanjiDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
