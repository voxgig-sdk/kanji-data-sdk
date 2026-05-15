# ProjectName SDK exists test

import pytest
from kanjidata_sdk import KanjiDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KanjiDataSDK.test(None, None)
        assert testsdk is not None
