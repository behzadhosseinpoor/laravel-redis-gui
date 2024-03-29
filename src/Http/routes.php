<?php

use Illuminate\Support\Facades\Route;
use Laravel\RedisGUI\Http\Controllers\ConnectionController;
use Laravel\RedisGUI\Http\Controllers\HomeController;
use Laravel\RedisGUI\Http\Controllers\KeyController;
use Laravel\RedisGUI\Http\Middleware\Connection;

Route::middleware([Connection::class])->prefix('api/{connection}')->group(function () {
    Route::get('', [ConnectionController::class, 'overview']);
    Route::get('keys', [KeyController::class, 'index']);
    Route::get('keys/{key}', [KeyController::class, 'show'])->where('key', '.+');
    Route::delete('keys/{key}', [KeyController::class, 'delete'])->where('key', '.+');
});

Route::get('/{view?}', [HomeController::class, 'index'])->where('view', '(.*)')->name('redis-gui');