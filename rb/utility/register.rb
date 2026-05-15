# KanjiData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KanjiDataUtility.registrar = ->(u) {
  u.clean = KanjiDataUtilities::Clean
  u.done = KanjiDataUtilities::Done
  u.make_error = KanjiDataUtilities::MakeError
  u.feature_add = KanjiDataUtilities::FeatureAdd
  u.feature_hook = KanjiDataUtilities::FeatureHook
  u.feature_init = KanjiDataUtilities::FeatureInit
  u.fetcher = KanjiDataUtilities::Fetcher
  u.make_fetch_def = KanjiDataUtilities::MakeFetchDef
  u.make_context = KanjiDataUtilities::MakeContext
  u.make_options = KanjiDataUtilities::MakeOptions
  u.make_request = KanjiDataUtilities::MakeRequest
  u.make_response = KanjiDataUtilities::MakeResponse
  u.make_result = KanjiDataUtilities::MakeResult
  u.make_point = KanjiDataUtilities::MakePoint
  u.make_spec = KanjiDataUtilities::MakeSpec
  u.make_url = KanjiDataUtilities::MakeUrl
  u.param = KanjiDataUtilities::Param
  u.prepare_auth = KanjiDataUtilities::PrepareAuth
  u.prepare_body = KanjiDataUtilities::PrepareBody
  u.prepare_headers = KanjiDataUtilities::PrepareHeaders
  u.prepare_method = KanjiDataUtilities::PrepareMethod
  u.prepare_params = KanjiDataUtilities::PrepareParams
  u.prepare_path = KanjiDataUtilities::PreparePath
  u.prepare_query = KanjiDataUtilities::PrepareQuery
  u.result_basic = KanjiDataUtilities::ResultBasic
  u.result_body = KanjiDataUtilities::ResultBody
  u.result_headers = KanjiDataUtilities::ResultHeaders
  u.transform_request = KanjiDataUtilities::TransformRequest
  u.transform_response = KanjiDataUtilities::TransformResponse
}
