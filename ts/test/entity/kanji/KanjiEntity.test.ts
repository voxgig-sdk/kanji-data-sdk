

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KanjiDataSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('KanjiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KANJI_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('KANJI_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KanjiDataSDK.test()
    const ent = testsdk.Kanji()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KanjiDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Kanji().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KANJI_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'kanji.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"grade":{"a":true,"h":"Grade","n":"grade","r":false,"sh":"School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)","t":"`$INTEGER`","key$":"grade","index$":0},"heisig_en":{"a":true,"h":"Heisig En","n":"heisig_en","r":false,"sh":"Heisig keyword in English","t":"`$STRING`","key$":"heisig_en","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"jlpt":{"a":true,"h":"Jlpt","n":"jlpt","r":false,"sh":"JLPT (Japanese Language Proficiency Test) level (1-5)","t":"`$INTEGER`","key$":"jlpt","index$":3},"kanji":{"a":true,"h":"Kanji","n":"kanji","r":false,"sh":"The kanji character","t":"`$STRING`","key$":"kanji","index$":4},"kun_readings":{"a":true,"h":"Kun Readings","n":"kun_readings","r":false,"sh":"Kun (Japanese) readings in hiragana","t":"`$ARRAY`","key$":"kun_readings","index$":5},"meanings":{"a":true,"h":"Meanings","n":"meanings","r":false,"sh":"English meanings of the kanji","t":"`$ARRAY`","key$":"meanings","index$":6},"name_readings":{"a":true,"h":"Name Readings","n":"name_readings","r":false,"sh":"Readings used in names","t":"`$ARRAY`","key$":"name_readings","index$":7},"on_readings":{"a":true,"h":"On Readings","n":"on_readings","r":false,"sh":"On (Chinese-derived) readings in katakana","t":"`$ARRAY`","key$":"on_readings","index$":8},"stroke_count":{"a":true,"h":"Stroke Count","n":"stroke_count","r":false,"sh":"Number of strokes in the kanji","t":"`$INTEGER`","key$":"stroke_count","index$":9},"unicode":{"a":true,"h":"Unicode","n":"unicode","r":false,"sh":"Unicode codepoint in hexadecimal","t":"`$STRING`","key$":"unicode","index$":10}},"id":{"field":"id","name":"id"},"name":"kanji","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /kanji/{character}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"猫","k":"param","n":"id","or":"character","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/kanji/{character}","q":{"exist":["id"]},"r":{"param":{"character":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"kanji"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"kanji","name__orig":"kanji","Name":"Kanji","name_":"kanji","name-":"kanji","NAME":"KANJI","index$":0}, {"active":true,"entity":"kanji","key$":"BasicKanjiFlow","kind":"basic","name":"BasicKanjiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"kanji_ref01","srcdatavar":"kanji_ref01_data","suffix":"_dt0"},"m":{"id":"kanji01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-kanji_ref01"}}],"index$":0,"route":"GET /kanji/{character}","record":{}}]}, 'Kanji', {"GET /kanji/{character}":{"protocol":"http","parameters":[{"name":"character","in":"path","required":true,"description":"The kanji character to retrieve information for","schema":{"type":"string","example":"猫"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let kanji_ref01_data = Object.values(setup.data.existing.kanji)[0] as any

    // LOAD
    const kanji_ref01_ent = client.Kanji()
    const kanji_ref01_match_dt0: any = {}
    kanji_ref01_match_dt0.id = kanji_ref01_data.id
    const kanji_ref01_data_dt0 = (await kanji_ref01_ent.load(kanji_ref01_match_dt0)).data()
    assert(kanji_ref01_data_dt0.id === kanji_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/kanji/KanjiTestData.json')

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
    ['kanji01','kanji02','kanji03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KANJI_DATA_TEST_KANJI_ENTID': idmap,
    'KANJI_DATA_TEST_LIVE': 'FALSE',
    'KANJI_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KANJI_DATA_TEST_KANJI_ENTID']

  const live = 'TRUE' === env.KANJI_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KANJI_DATA_TEST_KANJI_ENTID']
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
  
