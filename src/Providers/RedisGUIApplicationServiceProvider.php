<?php
/** @noinspection PhpUnused */

namespace Laravel\RedisGUI\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Laravel\RedisGUI\RedisGUI;

class RedisGUIApplicationServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->authorization();
    }

    /**
     * Configure the RedisGUI authorization services.
     *
     * @return void
     */
    protected function authorization(): void
    {
        $this->gate();

        RedisGUI::auth(function (Request $request) {
            return App::isLocal() || Gate::check('viewRedisGUI', [$request->user()]);
        });
    }

    /**
     * Register the RedisGUI gate.
     *
     * This gate determines who can access RedisGUI in non-local environments.
     *
     * @return void
     */
    protected function gate(): void
    {
        Gate::define('viewRedisGUI', function ($user) {
            return in_array($user->email, [
                //
            ]);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        //
    }
}