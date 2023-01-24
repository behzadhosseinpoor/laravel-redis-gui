<?php
/** @noinspection PhpUnhandledExceptionInspection */

namespace Laravel\RedisGUI\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Laravel\RedisGUI\Tools\ConnectionManager;

class ConnectionController extends Controller
{
    public function overview(): JsonResponse
    {
        $connection = ConnectionManager::get();
        $prefix = $connection->client()->_prefix('');
        $keys = 0;
        $info = $connection->command('info');
        $dbs = array_filter($info, function (string $key) {
            if (str_starts_with($key, 'db')) {
                return true;
            }

            return false;
        }, ARRAY_FILTER_USE_KEY);

        foreach ($dbs as $db) {
            $arr = explode(',', $db);

            if (isset($arr[0]) && str_starts_with($arr[0], 'keys=')) {
                $keys += intval(str_replace('keys=', '', $arr[0]));
            }
        }

        return $this->json(200, null, [
            'connected_clients' => $info['connected_clients'],
            'instantaneous_ops_per_sec' => $info['instantaneous_ops_per_sec'],
            'used_memory' => $info['used_memory'],
            'redis_version' => $info['redis_version'],
            'keys' => $keys,
            'prefix' => strlen($prefix) === 0 ? null : $prefix,
        ]);
    }
}
