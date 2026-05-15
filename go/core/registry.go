package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewKanjiEntityFunc func(client *KanjiDataSDK, entopts map[string]any) KanjiDataEntity

var NewReadingEntityFunc func(client *KanjiDataSDK, entopts map[string]any) KanjiDataEntity

var NewWordEntityFunc func(client *KanjiDataSDK, entopts map[string]any) KanjiDataEntity

