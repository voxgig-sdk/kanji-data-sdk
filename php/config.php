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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'short' => 'School grade level (1-6 for kyōiku kanji, 8 for remaining jōyō kanji)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'heisig_en',
              'short' => 'Heisig keyword in English',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'jlpt',
              'short' => 'JLPT (Japanese Language Proficiency Test) level (1-5)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'kanji',
              'short' => 'The kanji character',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'kun_readings',
              'short' => 'Kun (Japanese) readings in hiragana',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'meanings',
              'short' => 'English meanings of the kanji',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name_readings',
              'short' => 'Readings used in names',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'on_readings',
              'short' => 'On (Chinese-derived) readings in katakana',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'stroke_count',
              'short' => 'Number of strokes in the kanji',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'unicode',
              'short' => 'Unicode codepoint in hexadecimal',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'kanji',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '猫',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'character',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/kanji/{character}',
                  'parts' => [
                    'kanji',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'character' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
          'fields' => [],
          'name' => 'reading',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'ねこ',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'reading',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/reading/{reading}',
                  'parts' => [
                    'reading',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'reading' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'name' => 'meanings',
              'short' => 'Meanings of the word',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'variants',
              'short' => 'Different written and pronunciation variants',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'word',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '猫',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'character',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/words/{character}',
                  'parts' => [
                    'words',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'character' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
