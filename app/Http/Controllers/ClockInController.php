<?php

// app/Http/Controllers/ClockInController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Models\TimecapEmp;
use App\Models\TimecapEmpTimecard;
use App\Models\StartDay;
use Inertia\Inertia;
use Carbon\Carbon;

class ClockInController extends Controller {
    public function show() {
        return Inertia::render('ClockIn');
    }

    public function getServerTime() {
        return response()->json(['time' => Carbon::now('America/New_York')->format('H:i')]);
    }

    public function validateSSN(Request $request) {
        $request->validate(['tc_emp_ssn6' => 'required|string|size:6']);

        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();
        if (!$employee) return response()->json(['valid' => false, 'error' => 'Invalid SSN'], 422);

        $isClockedIn = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
            ->whereNull('tc_timecard_end')->exists();

        return response()->json(['valid' => true, 'isClockedIn' => $isClockedIn, 'employee' => $employee]);
    }

    public function store(Request $request) {
        Log::debug('Timecard job_id received:');

        $request->validate([
            'tc_emp_ssn6' => 'required|string|size:6',
            'tc_timecard_start' => 'required|string',
            'type' => 'required|in:in,out',
            'photo' => 'nullable|image|max:2048',
        ]);

        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->firstOrFail();
        $timestamp = Carbon::parse($request->tc_timecard_start);
        $user = Auth::user();

        $activeDay = StartDay::where('user_id', $user->id)
            ->whereDate('started_at', today())
            ->whereNull('ended_at')
            ->first();

        //if (!$activeDay) return response()->json(['error' => 'Start your day before clocking in.'], 403);

        if ($request->type === 'in') {
            $timecard = new TimecapEmpTimecard();
            $timecard->tc_emp_id = $employee->tc_emp_id;
            $timecard->tc_timecard_start = $timestamp;
            $timecard->tc_timecard_status = 'pending';
            $timecard->tc_timecard_submitted = 'pending';
            $timecard->tc_timecard_approved = 'pending';
            //$timecard->start_day_id = $activeDay->id;

            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('timecards/photos/start', 'public');
                $timecard->tc_emp_timecard_start_photo = $photoPath;
            }

            $timecard->save();
            return response()->json(['message' => 'Clocked in successfully.']);
        } else {
            $existing = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
                ->whereNull('tc_timecard_end')
                ->latest()
                ->first();

            if (!$existing) return response()->json(['error' => 'No open timecard found for this job today.'], 404);

            $existing->tc_timecard_end = $timestamp;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('timecards/photos/end', 'public');
                $existing->tc_emp_timecard_end_photo = $photoPath;
            }
            $existing->save();

            return response()->json(['message' => 'Clocked out successfully.']);
        }
    }

    public function saveSignature(Request $request) {
        try {
            $request->validate([
                'tc_emp_ssn6' => 'required|string|size:6',
                'signature' => 'required|string',
                'type' => 'required|in:in,out',
            ]);

            $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->firstOrFail();
            $column = $request->type === 'in' ? 'tc_emp_timecard_start_signature' : 'tc_emp_timecard_end_signature';

            $timecard = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)->latest()->firstOrFail();

            $signatureData = $request->input('signature');
            if (!preg_match('/^data:image\/png;base64,/', $signatureData)) {
                return response()->json(['error' => 'Invalid image format.'], 422);
            }

            $base64Image = preg_replace('/^data:image\/png;base64,/', '', $signatureData);
            $base64Image = str_replace(' ', '+', $base64Image);
            $decoded = base64_decode($base64Image);

            if (!$decoded) return response()->json(['error' => 'Failed to decode image.'], 422);

            $filename = 'signature_' . now()->timestamp . '_' . $employee->tc_emp_id . '.png';
            $path = "signatures/{$filename}";
            Storage::disk('public')->put($path, $decoded);

            $timecard->$column = $path;
            $timecard->save();

            return response()->json(['message' => 'Signature saved.']);
        } catch (\Throwable $e) {
            Log::error('Signature Save Error', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Server error while saving signature.'], 500);
        }
    }
}

// Note: routes already exist in the ROUTES section above.
