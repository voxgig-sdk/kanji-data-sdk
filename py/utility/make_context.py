# KanjiData SDK utility: make_context

from core.context import KanjiDataContext


def make_context_util(ctxmap, basectx):
    return KanjiDataContext(ctxmap, basectx)
