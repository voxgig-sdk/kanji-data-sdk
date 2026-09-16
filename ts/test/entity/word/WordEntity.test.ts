

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"meanings","req":false,"short":"Meanings of the word","type":"`$ARRAY`","index$":1},{"active":true,"name":"variants","req":false,"short":"Different written and pronunciation variants","type":"`$ARRAY`","index$":2}],"id":{"field":"id","name":"id"},"name":"word","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"猫","kind":"param","name":"id","orig":"character","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /words/{character}","json":"{\"operationId\":\"getWordsByKanji\",\"parameters\":[{\"description\":\"The kanji character to find words for\",\"in\":\"path\",\"name\":\"character\",\"required\":true,\"schema\":{\"example\":\"猫\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"meanings\":[{\"glosses\":[\"cat\"]}],\"variants\":[{\"priorities\":[\"ichi1\",\"news1\",\"nf09\"],\"pronounced\":\"ねこ\",\"written\":\"猫\"}]}],\"schema\":{\"items\":{\"properties\":{\"meanings\":{\"description\":\"Meanings of the word\",\"items\":{\"properties\":{\"glosses\":{\"description\":\"English translations/meanings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"variants\":{\"description\":\"Different written and pronunciation variants\",\"items\":{\"properties\":{\"priorities\":{\"description\":\"Priority/frequency indicators\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"pronounced\":{\"description\":\"Pronunciation in hiragana/katakana\",\"type\":\"string\"},\"written\":{\"description\":\"Written form of the word\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of words\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"No words found for the specified kanji\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/words/{character}","rename":{"param":{"character":"id"}},"segments":[{"lit":"words"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"word","name__orig":"word","Name":"Word","name_":"word","name-":"word","NAME":"WORD","index$":2}, {"active":true,"entity":"word","key$":"BasicWordFlow","kind":"basic","name":"BasicWordFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"word_ref01","srcdatavar":"word_ref01_data","suffix":"_dt0"},"match":{"id":"word01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-word_ref01"}}],"index$":0}]}, 'Word')
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
  
