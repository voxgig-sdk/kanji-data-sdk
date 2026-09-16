

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KANJI_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'kanji.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"grade","req":false,"short":"School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)","type":"`$INTEGER`","index$":0},{"active":true,"name":"heisig_en","req":false,"short":"Heisig keyword in English","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"jlpt","req":false,"short":"JLPT (Japanese Language Proficiency Test) level (1-5)","type":"`$INTEGER`","index$":3},{"active":true,"name":"kanji","req":false,"short":"The kanji character","type":"`$STRING`","index$":4},{"active":true,"name":"kun_readings","req":false,"short":"Kun (Japanese) readings in hiragana","type":"`$ARRAY`","index$":5},{"active":true,"name":"meanings","req":false,"short":"English meanings of the kanji","type":"`$ARRAY`","index$":6},{"active":true,"name":"name_readings","req":false,"short":"Readings used in names","type":"`$ARRAY`","index$":7},{"active":true,"name":"on_readings","req":false,"short":"On (Chinese-derived) readings in katakana","type":"`$ARRAY`","index$":8},{"active":true,"name":"stroke_count","req":false,"short":"Number of strokes in the kanji","type":"`$INTEGER`","index$":9},{"active":true,"name":"unicode","req":false,"short":"Unicode codepoint in hexadecimal","type":"`$STRING`","index$":10}],"id":{"field":"id","name":"id"},"name":"kanji","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"猫","kind":"param","name":"id","orig":"character","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /kanji/{character}","json":"{\"operationId\":\"getKanji\",\"parameters\":[{\"description\":\"The kanji character to retrieve information for\",\"in\":\"path\",\"name\":\"character\",\"required\":true,\"schema\":{\"example\":\"猫\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"grade\":8,\"heisig_en\":\"cat\",\"jlpt\":2,\"kanji\":\"猫\",\"kun_readings\":[\"ねこ\"],\"meanings\":[\"cat\"],\"name_readings\":[],\"on_readings\":[\"ビョウ\"],\"stroke_count\":11,\"unicode\":\"732b\"},\"schema\":{\"properties\":{\"grade\":{\"description\":\"School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)\",\"nullable\":true,\"type\":\"integer\"},\"heisig_en\":{\"description\":\"Heisig keyword in English\",\"nullable\":true,\"type\":\"string\"},\"jlpt\":{\"description\":\"JLPT (Japanese Language Proficiency Test) level (1-5)\",\"nullable\":true,\"type\":\"integer\"},\"kanji\":{\"description\":\"The kanji character\",\"type\":\"string\"},\"kun_readings\":{\"description\":\"Kun (Japanese) readings in hiragana\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"meanings\":{\"description\":\"English meanings of the kanji\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name_readings\":{\"description\":\"Readings used in names\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"on_readings\":{\"description\":\"On (Chinese-derived) readings in katakana\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"stroke_count\":{\"description\":\"Number of strokes in the kanji\",\"type\":\"integer\"},\"unicode\":{\"description\":\"Unicode codepoint in hexadecimal\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with kanji data\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Kanji not found\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Kanji character not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/kanji/{character}","rename":{"param":{"character":"id"}},"segments":[{"lit":"kanji"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"kanji","name__orig":"kanji","Name":"Kanji","name_":"kanji","name-":"kanji","NAME":"KANJI","index$":0}, {"active":true,"entity":"kanji","key$":"BasicKanjiFlow","kind":"basic","name":"BasicKanjiFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"kanji_ref01","srcdatavar":"kanji_ref01_data","suffix":"_dt0"},"match":{"id":"kanji01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-kanji_ref01"}}],"index$":0}]}, 'Kanji')
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
  
