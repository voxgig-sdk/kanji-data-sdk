# KanjiData SDK utility: feature_add
module KanjiDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
