<?php

return [
    'domain' => env('REDIS_GUI_DOMAIN'),
    'path' => env('REDIS_GUI_PATH', 'redis-gui'),
    'enabled' => env('REDIS_GUI_ENABLED', true),
    'connections' => [
        'cache',
        'default',
        'horizon'
    ],
    'middleware' => [
        'web'
    ],
];