<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TimecapReportController;
use App\Http\Controllers\ClockController;
use App\Http\Controllers\TimecardController;
use App\Http\Controllers\PdfExportController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
    ]);
});

Route::middleware('guest')->group(function () { 
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login'); 
    Route::post('login', [AuthenticatedSessionController::class, 'store']); // Other guest routes...
});

Route::middleware('auth')->group(function () { 
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout'); 
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard'); // Other authenticated routes...
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/timecap-reports', [TimecapReportController::class, 'index'])->name('timecap-reports.index');
    Route::post('/timecap-reports', [TimecapReportController::class, 'store'])->name('timecap-reports.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/clock-in', function () {
    return Inertia::render('ClockIn');
})->middleware(['auth', 'verified'])->name('clock-in');

Route::get('/clock-out', function () {
    return Inertia::render('ClockOut');
})->middleware(['auth', 'verified'])->name('clock-out');

Route::get('/time', [ClockController::class, 'show'])->name('time');
Route::get('/clock', [ClockController::class, 'show'])->name('clock');
Route::post('/validate-ssn', [TimecardController::class, 'validateSSN'])->name('validate-ssn');
Route::post('/timecard', [TimecardController::class, 'store'])->name('timecard.store');
Route::post('/save-signature', [TimecardController::class, 'saveSignature'])->name('savesignature');
Route::get('/export-pdf', [PdfExportController::class, 'exportPdf']);

require __DIR__.'/auth.php';
