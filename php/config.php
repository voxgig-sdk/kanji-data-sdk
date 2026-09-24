<?php
declare(strict_types=1);

// KanjiData SDK configuration

class KanjiDataConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "KanjiData",
                "slug" => "kanji-data",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://kanjiapi.dev/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "kanji" => [],
                    "reading" => [],
                    "word" => [],
                ],
            ],
            "entity" => [
        'kanji' => [
          'fields' => [
            [
              'name' => 'grade',
              'title' => 'Grade',
              'type' => '`$INTEGER`',
              'short' => 'School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)',
            ],
            [
              'name' => 'heisig_en',
              'title' => 'Heisig En',
              'type' => '`$STRING`',
              'short' => 'Heisig keyword in English',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'jlpt',
              'title' => 'Jlpt',
              'type' => '`$INTEGER`',
              'short' => 'JLPT (Japanese Language Proficiency Test) level (1-5)',
            ],
            [
              'name' => 'kanji',
              'title' => 'Kanji',
              'type' => '`$STRING`',
              'short' => 'The kanji character',
            ],
            [
              'name' => 'kun_readings',
              'title' => 'Kun Readings',
              'type' => '`$ARRAY`',
              'short' => 'Kun (Japanese) readings in hiragana',
            ],
            [
              'name' => 'meanings',
              'title' => 'Meanings',
              'type' => '`$ARRAY`',
              'short' => 'English meanings of the kanji',
            ],
            [
              'name' => 'name_readings',
              'title' => 'Name Readings',
              'type' => '`$ARRAY`',
              'short' => 'Readings used in names',
            ],
            [
              'name' => 'on_readings',
              'title' => 'On Readings',
              'type' => '`$ARRAY`',
              'short' => 'On (Chinese-derived) readings in katakana',
            ],
            [
              'name' => 'stroke_count',
              'title' => 'Stroke Count',
              'type' => '`$INTEGER`',
              'short' => 'Number of strokes in the kanji',
            ],
            [
              'name' => 'unicode',
              'title' => 'Unicode',
              'type' => '`$STRING`',
              'short' => 'Unicode codepoint in hexadecimal',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'kanji',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/kanji/{character}',
                  'segments' => [
                    [
                      'lit' => 'kanji',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'kanji',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'character' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'character',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '猫',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'reading' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'reading',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/reading/{reading}',
                  'segments' => [
                    [
                      'lit' => 'reading',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'reading',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'reading' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'reading',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'ねこ',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'word' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'meanings',
              'title' => 'Meanings',
              'type' => '`$ARRAY`',
              'short' => 'Meanings of the word',
            ],
            [
              'name' => 'variants',
              'title' => 'Variants',
              'type' => '`$ARRAY`',
              'short' => 'Different written and pronunciation variants',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'word',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/words/{character}',
                  'segments' => [
                    [
                      'lit' => 'words',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'words',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'character' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'character',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '猫',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return KanjiDataFeatures::make_feature($name);
    }
}
