<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClockInController;
use App\Http\Controllers\PostaController;
use Illuminate\Http\Request;
use App\Models\Posta;
use App\Models\ClockIn;
use App\Models\User;
use App\Models\Role;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Apply API middleware group which typically includes 'auth:sanctum' for API authentication
Route::middleware(['api', 'prevent.redirect.loop'])->group(function () {

    // Resourceful routes for 'postas'
    Route::apiResource('postas', PostaController::class);

    // Custom routes for 'clockin'
    Route::get('clockin/form', [ClockInController::class, 'showClockInForm']);
    Route::post('clockin/validate-ssn', [ClockInController::class, 'validateSSN']);
    Route::post('clockin', [ClockInController::class, 'clockIn']);
    Route::get('clockin/time', [ClockInController::class, 'getServerTime']);

    // Additional custom API routes if needed:
    // Route::get('/some-custom-endpoint', [SomeController::class, 'someMethod'])->name('api.some.custom.endpoint');
});

// If you need specific routes without the full API middleware stack:
Route::get('/public-api-endpoint', function () {
    return response()->json(['message' => 'This is a public endpoint.']);
})->name('public.api.endpoint');

// Example of a protected route that might not need the redirect loop prevention:
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
})->name('api.user');
