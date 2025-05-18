<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckDayStarted
{
    public function handle(Request $request, Closure $next)
    {
        // If day not started or previous day incomplete, redirect or return error
        // Otherwise allow access
        return $next($request);
    }
}