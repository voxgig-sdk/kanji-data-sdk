
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KanjiDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KanjiDataSDK.test()
    equal(testsdk instanceof KanjiDataSDK, true,
      'KanjiDataSDK.test() must return a client synchronously')
  })

})
