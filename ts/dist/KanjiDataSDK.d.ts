import { KanjiEntity } from './entity/KanjiEntity';
import { ReadingEntity } from './entity/ReadingEntity';
import { WordEntity } from './entity/WordEntity';
export type * from './KanjiDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { KanjiDataEntityBase } from './KanjiDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class KanjiDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Kanji(entopts?: Record<string, any>): KanjiEntity;
    Reading(entopts?: Record<string, any>): ReadingEntity;
    Word(entopts?: Record<string, any>): WordEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): KanjiDataSDK;
    tester(testopts?: any, sdkopts?: any): KanjiDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof KanjiDataSDK;
export { stdutil, config, BaseFeature, KanjiDataEntityBase, KanjiDataSDK, SDK, };
