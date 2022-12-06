<?php

namespace Laravel\RedisGUI;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;

class RedisGUI
{
    /**
     * The callback that should be used to authenticate RedisGUI users.
     *
     * @var Closure
     */
    public static $authUsing;

    /**
     * Register the RedisGUI authentication callback.
     *
     * @param Closure $callback
     * @return static
     */
    public static function auth(Closure $callback): RedisGUI
    {
        static::$authUsing = $callback;

        return new static;
    }

    /**
     * Determine if the given request can access the RedisGUI dashboard.
     *
     * @param Request $request
     * @return bool
     */
    public static function check(Request $request): bool
    {
        return (static::$authUsing ?: function () {
            return App::isLocal();
        })($request);
    }

    /**
     * Get the default JavaScript variables for RedisGUI.
     *
     * @return array
     */
    public static function scriptVariables(): array
    {
        return [
            'path' => Config::get('redis-gui.path'),
            'connections' => Config::get('redis-gui.connections'),
        ];
    }
}