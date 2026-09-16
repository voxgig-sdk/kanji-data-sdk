# KanjiData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KanjiDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      KanjiDataBaseFeature.new
    when "ratelimit"
      KanjiDataRatelimitFeature.new
    when "retry"
      KanjiDataRetryFeature.new
    when "test"
      KanjiDataTestFeature.new
    when "timeout"
      KanjiDataTimeoutFeature.new
    else
      KanjiDataBaseFeature.new
    end
  end
end
