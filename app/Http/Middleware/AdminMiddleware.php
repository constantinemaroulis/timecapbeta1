<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        Log::info('AdminMiddleware: Checking authentication and role.');

        if (Auth::check()) {
            Log::info('AdminMiddleware: User is authenticated.', ['user' => Auth::user()]);

            if (Auth::user()->role === 'super_admin') {
                Log::info('AdminMiddleware: User is super_admin.');
                return $next($request);
            } else {
                Log::info('AdminMiddleware: User is not super_admin.', ['role' => Auth::user()->role]);
            }
        } else {
            Log::info('AdminMiddleware: User is not authenticated.');
        }

        return redirect()->route('login')->with('error', 'You must be an admin to access this page.');
    }
}
