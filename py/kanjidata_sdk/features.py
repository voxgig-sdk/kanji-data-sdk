# KanjiData SDK feature factory

from kanjidata_sdk.feature.base_feature import KanjiDataBaseFeature
from kanjidata_sdk.feature.test_feature import KanjiDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: KanjiDataBaseFeature(),
        "test": lambda: KanjiDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
