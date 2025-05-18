<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Routing\Router;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\Authenticate;
use Inertia\Inertia;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ensure this is the only 'boot' method in the class

        Schema::defaultStringLength(191);

        $router = $this->app->make(Router::class);

        // Registering Inertia Middleware
        $router->aliasMiddleware('inertia', HandleInertiaRequests::class);

        // Other middleware
        // In your AppServiceProvider or RouteServiceProvider
        $router->aliasMiddleware('auth', Authenticate::class);
        $router->aliasMiddleware('verified', \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class);
        $router->aliasMiddleware('prevent.redirect.loop', \App\Http\Middleware\PreventRedirectLoop::class);
        $router->aliasMiddleware('admin', \App\Http\Middleware\AdminMiddleware::class);
        $router->aliasMiddleware('role', CheckRole::class);



        Vite::prefetch(concurrency: 3);
    }
}
