# KanjiData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module KanjiDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      KanjiDataBaseFeature.new
    when "test"
      KanjiDataTestFeature.new
    else
      KanjiDataBaseFeature.new
    end
  end
end
