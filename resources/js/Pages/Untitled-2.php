// ...existing code...

Route::middleware(['auth', 'verified', 'check.day'])->group(function () {
    Route::get('/timeclock', [ClockController::class, 'index'])->name('timeclock');
});

// ...existing code...