# KanjiData SDK utility: make_context
require_relative '../core/context'
module KanjiDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    KanjiDataContext.new(ctxmap, basectx)
  }
end
