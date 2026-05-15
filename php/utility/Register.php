<?php
declare(strict_types=1);

// KanjiData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

KanjiDataUtility::setRegistrar(function (KanjiDataUtility $u): void {
    $u->clean = [KanjiDataClean::class, 'call'];
    $u->done = [KanjiDataDone::class, 'call'];
    $u->make_error = [KanjiDataMakeError::class, 'call'];
    $u->feature_add = [KanjiDataFeatureAdd::class, 'call'];
    $u->feature_hook = [KanjiDataFeatureHook::class, 'call'];
    $u->feature_init = [KanjiDataFeatureInit::class, 'call'];
    $u->fetcher = [KanjiDataFetcher::class, 'call'];
    $u->make_fetch_def = [KanjiDataMakeFetchDef::class, 'call'];
    $u->make_context = [KanjiDataMakeContext::class, 'call'];
    $u->make_options = [KanjiDataMakeOptions::class, 'call'];
    $u->make_request = [KanjiDataMakeRequest::class, 'call'];
    $u->make_response = [KanjiDataMakeResponse::class, 'call'];
    $u->make_result = [KanjiDataMakeResult::class, 'call'];
    $u->make_point = [KanjiDataMakePoint::class, 'call'];
    $u->make_spec = [KanjiDataMakeSpec::class, 'call'];
    $u->make_url = [KanjiDataMakeUrl::class, 'call'];
    $u->param = [KanjiDataParam::class, 'call'];
    $u->prepare_auth = [KanjiDataPrepareAuth::class, 'call'];
    $u->prepare_body = [KanjiDataPrepareBody::class, 'call'];
    $u->prepare_headers = [KanjiDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [KanjiDataPrepareMethod::class, 'call'];
    $u->prepare_params = [KanjiDataPrepareParams::class, 'call'];
    $u->prepare_path = [KanjiDataPreparePath::class, 'call'];
    $u->prepare_query = [KanjiDataPrepareQuery::class, 'call'];
    $u->result_basic = [KanjiDataResultBasic::class, 'call'];
    $u->result_body = [KanjiDataResultBody::class, 'call'];
    $u->result_headers = [KanjiDataResultHeaders::class, 'call'];
    $u->transform_request = [KanjiDataTransformRequest::class, 'call'];
    $u->transform_response = [KanjiDataTransformResponse::class, 'call'];
});
