<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    DashboardController,
    HomeController,
    ClockInController,
    TimecardController,
    TimecardEmpController,
    SessionController,
    DeviceController,
    JobController, // Make sure JobController exists if you're using it
    ProfileController,
    TimecapEmpController,
    PdfExportController
};

// Public route
Route::get('/', fn () => inertia('Welcome'))->name('welcome');
Route::get('/home', [HomeController::class, 'index'])->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard / Home
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Clock In
    Route::get('/clock-in', [ClockInController::class, 'show'])->name('clockin.page');
    Route::get('/clock', [ClockInController::class, 'getServerTime'])->name('clock.time');
    Route::post('/validate-ssn', [ClockInController::class, 'validateSSN'])->name('validate.ssn');
    Route::post('/timecard', [ClockInController::class, 'store'])->name('clock.in');
    Route::post('/save-signature', [ClockInController::class, 'saveSignature'])->name('save.signature');

    // Timecards
    // Corrected route name from 'timecard.index' to 'timecards.index'
    Route::get('/timecards', [TimecardController::class, 'index'])->name('timecards.index');
    Route::get('/timecards/employee', [TimecardEmpController::class, 'index'])->name('timecards.index.employee');
    Route::get('/timecards/employee/export/pdf', [PdfExportController::class, 'exportPdf'])->name('timecards.export.pdf');
    Route::get('/timecards/employee/daily-timecards', [TimecardEmpController::class, 'dailySummary'])->name('timecards.daily');
    Route::get('/timecards/employee/export/{job}/{date}', [PdfExportController::class, 'exportByJobDate'])->name('timecards.export.byJobDate');
    Route::get('/timecards/employee/view/{job}/{date}', [TimecardEmpController::class, 'viewByJobDate'])->name('timecards.jobdate');

    // Devices
    Route::post('/device/register', [DeviceController::class, 'autoRegister'])->name('device.register');
    Route::get('/devices', [DeviceController::class, 'index'])->name('devices.index');
    Route::post('/devices', [DeviceController::class, 'store'])->name('devices.store');
    Route::delete('/devices/{device}', [DeviceController::class, 'destroy'])->name('devices.destroy');
    Route::post('/devices/{id}/attach-job', [DeviceController::class, 'attachToJob'])->name('devices.attach');

    // Jobs
    Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');

    // Employee Import
    Route::get('/import-employees', [TimecapEmpController::class, 'showImportForm'])->name('employees.import.form');
    Route::post('/import-employees', [TimecapEmpController::class, 'import'])->name('employees.import');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__ . '/auth.php';
