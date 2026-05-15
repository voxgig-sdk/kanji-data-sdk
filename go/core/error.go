package core

type KanjiDataError struct {
	IsKanjiDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewKanjiDataError(code string, msg string, ctx *Context) *KanjiDataError {
	return &KanjiDataError{
		IsKanjiDataError: true,
		Sdk:              "KanjiData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *KanjiDataError) Error() string {
	return e.Msg
}
