<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class PreventRedirectLoop
{
    protected $maxRedirects = 5; // You can adjust this based on your needs

    public function handle(Request $request, Closure $next)
    {
        // Initialize session variable for counting redirects
        if (!$request->session()->has('redirect_count')) {
            $request->session()->put('redirect_count', 0);
        }

        // Check if redirect count exceeds the limit
        if ($request->session()->get('redirect_count') >= $this->maxRedirects) {
            Log::warning('Redirect loop detected! Redirect limit exceeded.', [
                'url' => $request->fullUrl(),
                'count' => $request->session()->get('redirect_count')
            ]);
            // Instead of aborting, redirect to a safe place or show an error
            return redirect()->route('error-page')->with('error', 'A redirect loop has been detected. Please try again or contact support.');
        }

        // Increment redirect count if the response is a redirect
        $response = $next($request);
        if ($response->isRedirect()) {
            $request->session()->increment('redirect_count');
        } else {
            // Reset the counter if it's not a redirect
            $request->session()->forget('redirect_count');
        }

        return $response;
    }
}
