<?php

use Illuminate\Support\Facades\Route;
use Laravel\RedisGUI\Http\Controllers\HomeController;

Route::prefix('api')->group(function () {

});

Route::get('/{view?}', [HomeController::class, 'index'])->where('view', '(.*)')->name('redis-gui');