<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TimecapReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClockController;
use App\Http\Controllers\PdfExportController;
use App\Http\Controllers\TimecardController;

/*
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
    ]);
})->name('home');
*/
Route::redirect('/', '/clock-in');



Route::middleware(['auth', 'verified', 'prevent.redirect.loop', 'device.session'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/timecap-reports', [TimecapReportController::class, 'index'])->name('timecap-reports.index');
    Route::post('/timecap-reports', [TimecapReportController::class, 'store'])->name('timecap-reports.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/clock-in', function () {
        return Inertia::render('ClockIn');
    })->name('clock-in');

    Route::get('/clock-out', function () {
        return Inertia::render('ClockOut');
    })->name('clock-out');

});

Route::get('/time', [ClockController::class, 'show'])->name('time');
Route::get('/clock', [ClockController::class, 'show'])->name('clock');
Route::post('/validate-ssn', [TimecardController::class, 'validateSSN'])->name('validate-ssn');
Route::post('/timecard', [TimecardController::class, 'store'])->name('timecard.store');
Route::post('/save-signature', [TimecardController::class, 'saveSignature'])->name('savesignature');
Route::get('/export-pdf', [PdfExportController::class, 'exportPdf']);

//$request->session()->regenerate();
require __DIR__.'/auth.php';
