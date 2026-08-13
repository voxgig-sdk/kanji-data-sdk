# KanjiData SDK utility: make_context

from kanjidata_sdk.core.context import KanjiDataContext


def make_context_util(ctxmap, basectx):
    return KanjiDataContext(ctxmap, basectx)
