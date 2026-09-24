

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KanjiDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('WordEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KANJI_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('KANJI_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KanjiDataSDK.test()
    const ent = testsdk.Word()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KANJI_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'word.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"meanings":{"a":true,"h":"Meanings","n":"meanings","r":false,"sh":"Meanings of the word","t":"`$ARRAY`","key$":"meanings","index$":1},"variants":{"a":true,"h":"Variants","n":"variants","r":false,"sh":"Different written and pronunciation variants","t":"`$ARRAY`","key$":"variants","index$":2}},"id":{"field":"id","name":"id"},"name":"word","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /words/{character}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"猫","k":"param","n":"id","or":"character","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/words/{character}","q":{"exist":["id"]},"r":{"param":{"character":"id"}},"s":[{"lit":"words"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"word","name__orig":"word","Name":"Word","name_":"word","name-":"word","NAME":"WORD","index$":2}, {"active":true,"entity":"word","key$":"BasicWordFlow","kind":"basic","name":"BasicWordFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"word_ref01","srcdatavar":"word_ref01_data","suffix":"_dt0"},"m":{"id":"word01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-word_ref01"}}],"index$":0}]}, 'Word', {"GET /words/{character}":{"protocol":"http","operationId":"getWordsByKanji","responses":{"200":{"description":"Successful response with list of words","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"meanings":{"type":"array","items":{"type":"object","properties":{"glosses":{"type":"array","items":{"type":"string"},"description":"English translations/meanings"}}},"description":"Meanings of the word","key$":"meanings"},"variants":{"type":"array","items":{"type":"object","properties":{"written":{"type":"string","description":"Written form of the word"},"pronounced":{"type":"string","description":"Pronunciation in hiragana/katakana"},"priorities":{"type":"array","items":{"type":"string"},"description":"Priority/frequency indicators"}}},"description":"Different written and pronunciation variants","key$":"variants"}},"x-ref":"#/components/schemas/Word","key$":"items"}},"example":[{"meanings":[{"glosses":["cat"]}],"variants":[{"written":"猫","pronounced":"ねこ","priorities":["ichi1","news1","nf09"]}]}]}}},"404":{"description":"No words found for the specified kanji","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"character","in":"path","required":true,"description":"The kanji character to find words for","schema":{"type":"string","example":"猫"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let word_ref01_data = Object.values(setup.data.existing.word)[0] as any

    // LOAD
    const word_ref01_ent = client.Word()
    const word_ref01_match_dt0: any = {}
    word_ref01_match_dt0.id = word_ref01_data.id
    const word_ref01_data_dt0 = (await word_ref01_ent.load(word_ref01_match_dt0)).data()
    assert(word_ref01_data_dt0.id === word_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/word/WordTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = KanjiDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['word01','word02','word03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KANJI_DATA_TEST_WORD_ENTID': idmap,
    'KANJI_DATA_TEST_LIVE': 'FALSE',
    'KANJI_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KANJI_DATA_TEST_WORD_ENTID']

  const live = 'TRUE' === env.KANJI_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KANJI_DATA_TEST_WORD_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new KanjiDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.KANJI_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
