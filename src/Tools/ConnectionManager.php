<?php

namespace Laravel\RedisGUI\Tools;

use Illuminate\Redis\Connections\Connection;
use Illuminate\Support\Facades\Redis;

class ConnectionManager
{
    private static $connection;

    public static function set(string $name): void
    {
        self::$connection = Redis::connection($name);
    }

    public static function get(): Connection
    {
        return self::$connection;
    }
}
