<?php

use Illuminate\Auth\Middleware\Authenticate;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Session\Middleware\StartSession;
use App\Http\Middleware\PreventRedirectLoop; // Add this line

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            StartSession::class, // Ensure session starts before authentication checks
            HandleInertiaRequests::class, // Handle Inertia requests after session and auth but before adding headers
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class, // Add headers for preloaded assets
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
