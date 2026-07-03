package voxgigkanjidatasdk

import (
	"github.com/voxgig-sdk/kanji-data-sdk/go/core"
	"github.com/voxgig-sdk/kanji-data-sdk/go/entity"
	"github.com/voxgig-sdk/kanji-data-sdk/go/feature"
	_ "github.com/voxgig-sdk/kanji-data-sdk/go/utility"
)

// Type aliases preserve external API.
type KanjiDataSDK = core.KanjiDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type KanjiDataEntity = core.KanjiDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type KanjiDataError = core.KanjiDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewKanjiEntityFunc = func(client *core.KanjiDataSDK, entopts map[string]any) core.KanjiDataEntity {
		return entity.NewKanjiEntity(client, entopts)
	}
	core.NewReadingEntityFunc = func(client *core.KanjiDataSDK, entopts map[string]any) core.KanjiDataEntity {
		return entity.NewReadingEntity(client, entopts)
	}
	core.NewWordEntityFunc = func(client *core.KanjiDataSDK, entopts map[string]any) core.KanjiDataEntity {
		return entity.NewWordEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewKanjiDataSDK = core.NewKanjiDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewKanjiDataSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *KanjiDataSDK  { return NewKanjiDataSDK(nil) }
func Test() *KanjiDataSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
