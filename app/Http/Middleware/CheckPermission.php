<?php 

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Middleware;

class CheckPermission
{
    public function handle($request, Closure $next, $permission)
    {
        if (Auth::user()->can($permission)) {
            return $next($request);
        }

        abort(403, 'Unauthorized');
    }
}
