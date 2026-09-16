

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


describe('ReadingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KANJI_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('KANJI_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KanjiDataSDK.test()
    const ent = testsdk.Reading()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KANJI_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reading.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"reading","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"ねこ","kind":"param","name":"id","orig":"reading","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /reading/{reading}","json":"{\"operationId\":\"getKanjiByReading\",\"parameters\":[{\"description\":\"The reading in hiragana or katakana to search for\",\"in\":\"path\",\"name\":\"reading\",\"required\":true,\"schema\":{\"example\":\"ねこ\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[\"猫\"],\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of kanji\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"No kanji found for the specified reading\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/reading/{reading}","rename":{"param":{"reading":"id"}},"segments":[{"lit":"reading"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"reading","name__orig":"reading","Name":"Reading","name_":"reading","name-":"reading","NAME":"READING","index$":1}, {"active":true,"entity":"reading","key$":"BasicReadingFlow","kind":"basic","name":"BasicReadingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"reading_ref01","srcdatavar":"reading_ref01_data","suffix":"_dt0"},"match":{"id":"reading01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-reading_ref01"}}],"index$":0}]}, 'Reading')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let reading_ref01_data = Object.values(setup.data.existing.reading)[0] as any

    // LOAD
    const reading_ref01_ent = client.Reading()
    const reading_ref01_match_dt0: any = {}
    reading_ref01_match_dt0.id = reading_ref01_data.id
    const reading_ref01_data_dt0 = (await reading_ref01_ent.load(reading_ref01_match_dt0)).data()
    assert(reading_ref01_data_dt0.id === reading_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/reading/ReadingTestData.json')

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
    ['reading01','reading02','reading03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KANJI_DATA_TEST_READING_ENTID': idmap,
    'KANJI_DATA_TEST_LIVE': 'FALSE',
    'KANJI_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KANJI_DATA_TEST_READING_ENTID']

  const live = 'TRUE' === env.KANJI_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KANJI_DATA_TEST_READING_ENTID']
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
  
