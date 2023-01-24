<?php
/** @noinspection PhpUnusedParameterInspection */

/** @noinspection PhpUnhandledExceptionInspection */

namespace Laravel\RedisGUI\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\RedisGUI\Exceptions\RedisGUIException;
use Laravel\RedisGUI\Http\Requests\Key\IndexRequest;
use Laravel\RedisGUI\Tools\ConnectionManager;

class KeyController extends Controller
{
    public function index(IndexRequest $request, string $connection): JsonResponse
    {
        $objects = [];
        $type = $request->filled('type') ? intval($request->input('type')) : -1;
        $query = $request->filled('query') ? $request->input('query') : '*';
        $connection = ConnectionManager::get();
        $prefix = $connection->client()->_prefix('');
        $keys = $connection->command('keys', [$query]);

        foreach ($keys as $key) {
            $k = substr($key, strlen($prefix));
            $redisType = $connection->command('type', [$k]);
            $ttl = $connection->command('ttl', [$k]);

            if ($type === -1 || $type === $redisType) {
                $objects[] = [
                    'key' => $key,
                    'type' => $redisType,
                    'ttl' => $ttl,
                ];
            }
        }

        return $this->json(200, null, $objects);
    }

    public function show(Request $request, string $connection, string $key): JsonResponse
    {
        $connection = ConnectionManager::get();
        $prefix = $connection->client()->_prefix('');
        $k = substr($key, strlen($prefix));

        $data = $connection->command('get', [$k]);
        $ttl = $connection->command('ttl', [$k]);
        $type = $connection->command('type', [$k]);

        if ($ttl === -2 && $type === 0) {
            throw new RedisGUIException(404, trans('redis-gui::errors.not_found_key', [], 'en'));
        }

        return $this->json(200, null, [
            'key' => $key,
            'type' => $type,
            'ttl' => $ttl,
            'data' => $data,
        ]);
    }
}
