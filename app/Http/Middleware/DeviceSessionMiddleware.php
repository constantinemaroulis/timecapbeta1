
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DeviceSessionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // ...existing code or logic...

        // Example of setting device session or location tracking
        if (!$request->session()->has('device_session')) {
            $request->session()->put('device_session', [
                'device_id' => $request->header('User-Agent'),
                'location' => $request->ip(),
                // ...any other relevant data...
            ]);
        }

        return $next($request);
    }
}
