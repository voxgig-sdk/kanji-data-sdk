<?php
declare(strict_types=1);

// KanjiData SDK utility: result_headers

class KanjiDataResultHeaders
{
    public static function call(KanjiDataContext $ctx): ?KanjiDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
