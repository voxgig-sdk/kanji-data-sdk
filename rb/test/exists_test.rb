# KanjiData SDK exists test

require "minitest/autorun"
require_relative "../KanjiData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KanjiDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
