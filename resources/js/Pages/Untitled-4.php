// ...existing code...

Route::middleware(['start.day'])->group(function () {
    Route::get('/timeclock', [ClockController::class, 'index'])->name('timeclock');
});

// ...existing code...