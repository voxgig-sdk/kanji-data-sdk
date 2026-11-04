import { KanjiDataEntityBase } from '../KanjiDataEntityBase';
import type { KanjiDataSDK } from '../KanjiDataSDK';
import type { Control } from '../types';
import type { Word, WordListMatch } from '../KanjiDataTypes';
declare class WordEntity extends KanjiDataEntityBase<Word> {
    constructor(client: KanjiDataSDK, entopts: any);
    make(this: WordEntity): WordEntity;
    list(this: any, reqmatch?: WordListMatch, ctrl?: Control): Promise<WordEntity[]>;
}
export { WordEntity };
