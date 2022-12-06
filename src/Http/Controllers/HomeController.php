<?php

namespace Laravel\RedisGUI\Http\Controllers;

use Illuminate\Contracts\View\View;
use Laravel\RedisGUI\RedisGUI;

class HomeController extends Controller
{
    /**
     * Display the RedisGUI view.
     *
     * @return View
     */
    public function index(): View
    {
        return view('redis-gui::layout', [
            'redisGUIScriptVariables' => RedisGUI::scriptVariables(),
        ]);
    }
}