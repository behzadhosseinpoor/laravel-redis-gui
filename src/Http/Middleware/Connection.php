<?php
/** @noinspection PhpUnhandledExceptionInspection */

namespace Laravel\RedisGUI\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Config;
use Laravel\RedisGUI\Exceptions\RedisGUIException;
use Laravel\RedisGUI\Tools\ConnectionManager;

class Connection
{
    /**
     * Handle the connection.
     *
     * @param Request $request
     * @param Closure $next
     * @return Response|void
     */
    public function handle(Request $request, Closure $next)
    {
        $connection = $request->route()->parameter('connection');

        if (!in_array($connection, Config::get('redis-gui.connections'))) {
            throw new RedisGUIException(404, trans('redis-gui::errors.not_found_connection', [], 'en'));
        }

        ConnectionManager::set($connection);

        return $next($request);
    }
}
