<?php
/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUnused */

namespace Laravel\RedisGUI\Providers;

use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\RedisGUI\Console\InstallCommand;
use Laravel\RedisGUI\Console\PublishCommand;
use Laravel\RedisGUI\Exceptions\Handler;
use Laravel\RedisGUI\Http\Middleware\Authorize;

class RedisGUIServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerCommands();
        $this->registerPublishing();

        if (!Config::get('redis-gui.enabled')) {
            return;
        }

        Route::middlewareGroup('redis-gui', array_merge(Config::get('redis-gui.middleware', []), [
            Authorize::class
        ]));

        $this->registerRoutes();
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'redis-gui');
        $this->loadTranslationsFrom(__DIR__ . '/../../lang', 'redis-gui');

        if (Request::is(Config::get('redis-gui.path') . '/api/*') && Request::wantsJson()) {
            $this->app->bind(ExceptionHandler::class, Handler::class);
        }
    }

    /**
     * Register the package routes.
     *
     * @return void
     */
    private function registerRoutes(): void
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__ . '/../Http/routes.php');
        });
    }

    /**
     * Get the RedisGUI route group configuration array.
     *
     * @return array
     */
    private function routeConfiguration(): array
    {
        return [
            'domain' => Config::get('redis-gui.domain'),
            'namespace' => 'Laravel\RedisGUI\Http\Controllers',
            'prefix' => Config::get('redis-gui.path'),
            'middleware' => 'redis-gui',
        ];
    }

    /**
     * Register the package's publishable resources.
     *
     * @return void
     */
    private function registerPublishing(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../../public' => App::publicPath() . '/vendor/redis-gui',
            ], ['redis-gui-assets', 'laravel-assets']);

            $this->publishes([
                __DIR__ . '/../../config/redis-gui.php' => App::configPath('redis-gui.php'),
            ], 'redis-gui-config');

            $this->publishes([
                __DIR__ . '/../../stubs/RedisGUIServiceProvider.stub' => App::path('Providers/RedisGUIServiceProvider.php'),
            ], 'redis-gui-provider');
        }
    }

    /**
     * Register the package's commands.
     *
     * @return void
     */
    protected function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                InstallCommand::class,
                PublishCommand::class,
            ]);
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../../config/redis-gui.php', 'redis-gui'
        );
    }
}