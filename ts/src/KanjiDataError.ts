
import { Context } from './Context'


class KanjiDataError extends Error {

  isKanjiDataError = true

  sdk = 'KanjiData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  KanjiDataError
}

