# KanjiData SDK utility: prepare_body
require_relative 'media'
module KanjiDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return KanjiDataUtilities.raw_body(ctx.reqdata) if KanjiDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
