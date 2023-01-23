<?php /** @noinspection PhpUnhandledExceptionInspection */

namespace Laravel\RedisGUI\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Laravel\RedisGUI\Http\Requests\Key\IndexRequest;
use Laravel\RedisGUI\Tools\ConnectionManager;

class KeyController extends Controller
{
    private function toTree(array $objects): array
    {
        return [];
    }

    public function index(IndexRequest $request): JsonResponse
    {
        $objects = [];
        $view = $request->filled('view') ? $request->input('view') : '';
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

        if (strlen($view) > 0) {
            $objects = $this->toTree($objects);
        }

        return $this->json(200, null, $objects);
    }
}
