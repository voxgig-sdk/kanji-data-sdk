# KanjiData SDK utility: make_context

from projectname_sdk.core.context import KanjiDataContext


def make_context_util(ctxmap, basectx):
    return KanjiDataContext(ctxmap, basectx)
