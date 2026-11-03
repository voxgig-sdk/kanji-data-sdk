package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewKanjiEntityFunc func(client *KanjiDataSDK, entopts map[string]any) KanjiDataEntityBase

var NewReadingEntityFunc func(client *KanjiDataSDK, entopts map[string]any) KanjiDataEntityBase

var NewWordEntityFunc func(client *KanjiDataSDK, entopts map[string]any) KanjiDataEntityBase

