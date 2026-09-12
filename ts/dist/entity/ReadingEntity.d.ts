import { KanjiDataEntityBase } from '../KanjiDataEntityBase';
import type { KanjiDataSDK } from '../KanjiDataSDK';
import type { Control } from '../types';
import type { Reading, ReadingLoadMatch } from '../KanjiDataTypes';
declare class ReadingEntity extends KanjiDataEntityBase<Reading> {
    constructor(client: KanjiDataSDK, entopts: any);
    make(this: ReadingEntity): ReadingEntity;
    load(this: any, reqmatch?: ReadingLoadMatch, ctrl?: Control): Promise<ReadingEntity>;
}
export { ReadingEntity };
