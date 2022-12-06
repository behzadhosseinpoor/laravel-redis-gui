<?php

namespace Laravel\RedisGUI\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\RedisGUI\RedisGUI;

class Authorize
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return Response|void
     */
    public function handle(Request $request, Closure $next)
    {
        return RedisGUI::check($request) ? $next($request) : abort(403);
    }
}