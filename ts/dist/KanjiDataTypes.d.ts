export interface Kanji {
    grade?: number;
    heisig_en?: string;
    id?: string;
    jlpt?: number;
    kanji?: string;
    kun_readings?: any[];
    meanings?: any[];
    name_readings?: any[];
    on_readings?: any[];
    stroke_count?: number;
    unicode?: string;
}
export interface KanjiLoadMatch {
    id: string;
}
export interface Reading {
    id?: string;
}
export interface ReadingLoadMatch {
    id: string;
}
export interface Word {
    id?: string;
    meanings?: any[];
    variants?: any[];
}
export interface WordLoadMatch {
    id: string;
}
