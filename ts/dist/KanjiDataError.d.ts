import { Context } from './Context';
declare class KanjiDataError extends Error {
    isKanjiDataError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { KanjiDataError };
