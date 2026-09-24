"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanjiDataError = void 0;
class KanjiDataError extends Error {
    isKanjiDataError = true;
    sdk = 'KanjiData';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.KanjiDataError = KanjiDataError;
//# sourceMappingURL=KanjiDataError.js.map