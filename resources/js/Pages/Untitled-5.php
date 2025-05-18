<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckStartDay
{
    public function handle(Request $request, Closure $next)
    {
        // If no active day, redirect or show an error
        return $next($request);
    }
}