import { KanjiDataEntityBase } from '../KanjiDataEntityBase';
import type { KanjiDataSDK } from '../KanjiDataSDK';
import type { Control } from '../types';
import type { Word, WordLoadMatch } from '../KanjiDataTypes';
declare class WordEntity extends KanjiDataEntityBase<Word> {
    constructor(client: KanjiDataSDK, entopts: any);
    make(this: WordEntity): WordEntity;
    load(this: any, reqmatch?: WordLoadMatch, ctrl?: Control): Promise<WordEntity>;
}
export { WordEntity };
