-- KanjiData SDK error

local KanjiDataError = {}
KanjiDataError.__index = KanjiDataError


function KanjiDataError.new(code, msg, ctx)
  local self = setmetatable({}, KanjiDataError)
  self.is_sdk_error = true
  self.sdk = "KanjiData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function KanjiDataError:error()
  return self.msg
end


function KanjiDataError:__tostring()
  return self.msg
end


return KanjiDataError
