<?php
/** @noinspection PhpUnusedParameterInspection */

/** @noinspection PhpUnhandledExceptionInspection */

namespace Laravel\RedisGUI\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Redis\Connections\Connection;
use Laravel\RedisGUI\Exceptions\RedisGUIException;
use Laravel\RedisGUI\Http\Requests\Key\IndexRequest;
use Laravel\RedisGUI\Tools\ConnectionManager;

class KeyController extends Controller
{
    private function removePrefix(string $key, string $prefix): string
    {
        if (str_starts_with($key, $prefix)) {
            $key = substr($key, strlen($prefix));
        }

        return $key;
    }

    public function index(IndexRequest $request, string $connection): JsonResponse
    {
        $objects = [];
        $type = $request->filled('type') ? intval($request->input('type')) : -1;
        $query = $request->filled('query') ? $request->input('query') : '*';
        $connection = ConnectionManager::get();
        $prefix = $connection->client()->_prefix('');
        $keys = $connection->command('keys', [$query]);

        foreach ($keys as $key) {
            $k = $this->removePrefix($key, $prefix);
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

    private function getData(Connection $connection, int $type, string $key)
    {
        // TODO Stream, type => 6

        $data = false;

        if ($type === 1) {
            $data = $connection->command('get', [$key]);
        } else if ($type === 2) {
            $data = $connection->command('sinter', [$key]);
        } else if ($type === 4) {
            $data = $connection->command('zrange', [$key, 0, -1, true]);
        } else if ($type === 3) {
            $data = $connection->command('lrange', [$key, 0, -1]);
        } else if ($type === 5) {
            $data = $connection->command('hgetall', [$key]);
        }

        if (is_bool($data) && !$data) {
            $data = null;
        }

        return $data;
    }

    public function show(Request $request, string $connection, string $key): JsonResponse
    {
        $connection = ConnectionManager::get();
        $prefix = $connection->client()->_prefix('');
        $k = $this->removePrefix($key, $prefix);
        $ttl = $connection->command('ttl', [$k]);
        $type = $connection->command('type', [$k]);
        $data = $this->getData($connection, $type, $k);

        if (is_null($data)) {
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
