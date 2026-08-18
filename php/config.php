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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'heisig_en',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'jlpt',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'kanji',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'kun_readings',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'meanings',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name_readings',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'on_readings',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'stroke_count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'unicode',
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'variants',
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
