<?php

namespace Laravel\RedisGUI\Tools;

use Illuminate\Redis\Connections\Connection;
use Illuminate\Support\Facades\Redis;

class ConnectionManager
{
    private static $connection;

    public static function set(string $name): Connection
    {
        self::$connection = Redis::connection($name);

        return self::$connection;
    }

    public static function get(): Connection
    {
        return self::$connection;
    }
}
