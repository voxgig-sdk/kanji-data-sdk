import { KanjiDataEntityBase } from '../KanjiDataEntityBase';
import type { KanjiDataSDK } from '../KanjiDataSDK';
import type { Control } from '../types';
import type { Kanji, KanjiLoadMatch } from '../KanjiDataTypes';
declare class KanjiEntity extends KanjiDataEntityBase<Kanji> {
    constructor(client: KanjiDataSDK, entopts: any);
    make(this: KanjiEntity): KanjiEntity;
    load(this: any, reqmatch?: KanjiLoadMatch, ctrl?: Control): Promise<KanjiEntity>;
}
export { KanjiEntity };
