<?php

namespace App\Http\Controllers;

use App\Models\TimecapEmp;
use App\Models\TimecapEmpTimecard;
use App\Models\TimecapEmpDetail;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

class TimecardEmpController extends Controller
{
    public function index()
    {
        $timecards = TimecapEmpTimecard::with('employee.details')
            ->latest()
            ->paginate(25);

        return Inertia::render('Timecards/Employee/Index', [
            'timecards' => $timecards,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tc_emp_ssn6' => 'required|exists:timecap_emp,tc_emp_ssn6',
            'photo'       => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'type'        => 'required|in:in,out',
        ]);

        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->firstOrFail();
        $timestamp = Carbon::now('America/New_York');
        $adjusted = $this->applyRules($employee->tc_emp_id, $timestamp, $request->type);

        // Save the photo to storage/timecards/photos
        $photoName = 'photo_' . now()->timestamp . '_' . uniqid() . '.' . $request->photo->extension();
        $photoPath = $request->file('photo')->storeAs('timecards/photos', $photoName, 'public');

        $openTimecard = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
            ->whereNull('tc_timecard_end')
            ->latest()
            ->first();

        if ($openTimecard && $request->type === 'out') {
            $openTimecard->update([
                'tc_timecard_end'           => $timestamp,
                'tc_adjusted_timecard_end'  => $adjusted,
                'tc_emp_timecard_end_photo' => $photoPath,
            ]);
        } elseif (!$openTimecard && $request->type === 'in') {
            TimecapEmpTimecard::create([
                'tc_emp_id'                     => $employee->tc_emp_id,
                'tc_job_costcodes'             => $request->tc_job_costcodes ?? null,
                'tc_timecard_start'            => $timestamp,
                'tc_adjusted_timecard_start'   => $adjusted,
                'tc_emp_timecard_start_photo'  => $photoPath,
                'tc_timecard_status'           => 'pending',
                'tc_timecard_submitted'        => 'pending',
                'tc_timecard_approved'         => 'pending',
            ]);
        } else {
            return response()->json(['error' => 'Invalid clock-in/clock-out request'], 400);
        }

        return response()->json(['success' => true, 'message' => 'Timecard created successfully']);
    }

    public function validateSsn(Request $request)
    {
        $request->validate([
            'tc_emp_ssn6' => 'required|exists:timecap_emp,tc_emp_ssn6',
        ]);

        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();

        if (!$employee) {
            return response()->json(['valid' => false], 404);
        }

        $isClockedIn = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
            ->whereNull('tc_timecard_end')
            ->exists();

        return response()->json([
            'valid'       => true,
            'isClockedIn' => $isClockedIn,
        ]);
    }

    public function saveSignature(Request $request)
    {
        $request->validate([
            'tc_emp_ssn6' => 'required|exists:timecap_emp,tc_emp_ssn6',
            'signature'   => 'required',
            'type'        => 'required|in:in,out',
        ]);

        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->firstOrFail();
        $signatureData = $request->input('signature');

        if (!preg_match('/^data:image\/png;base64,/', $signatureData)) {
            return response()->json(['error' => 'Invalid signature format'], 422);
        }

        $base64 = str_replace(' ', '+', preg_replace('/^data:image\/png;base64,/', '', $signatureData));
        $decoded = base64_decode($base64);

        if (!$decoded) {
            return response()->json(['error' => 'Failed to decode signature'], 422);
        }

        $filename = 'signature_' . now()->timestamp . '_' . $employee->tc_emp_id . '.png';
        $path = "timecards/signatures/{$filename}";
        Storage::disk('public')->put("timecards/signatures/{$filename}", $decoded);

        $query = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)->latest();

        if ($request->type === 'in') {
            $timecard = $query->whereNull('tc_emp_timecard_start_signature')->first();
            $timecard?->update(['tc_emp_timecard_start_signature' => $path]);
        } else {
            $timecard = $query->whereNull('tc_emp_timecard_end_signature')->first();
            $timecard?->update(['tc_emp_timecard_end_signature' => $path]);
        }

        return response()->json(['success' => true, 'message' => 'Signature saved successfully']);
    }

    private function applyRules($jobId, $timestamp, $type)
    {
        $rules = Setting::where('job_id', $jobId)->orWhereNull('job_id')->get();

        foreach ($rules as $setting) {
            if ($setting->type === $type) {
                return match ($setting->rule) {
                    'round_to_nearest' => $timestamp->copy()->startOfHour(),
                    'round_down'       => $timestamp->copy()->minute(0),
                    default            => $timestamp,
                };
            }
        }

        return $timestamp;
    }

    public function showClockInForm()
    {
        return Inertia::render('ClockIn');
    }

    public function dailySummary()
    {
        $grouped = TimecapEmpTimecard::with(['employee', 'details', 'job'])
            ->get()
            ->groupBy(function ($tc) {
                return optional($tc->tc_timecard_start)->toDateString();
            });

        return Inertia::render('Timecards/Employee/DailyTimecardSummary', [
            'groupedTimecards' => $grouped
        ]);
    }

    public function viewByJobDate($jobId, $date)
    {
        $timecards = TimecapEmpTimecard::with(['employee', 'details'])
            ->whereDate('tc_timecard_start', $date)
            ->get();

        return Inertia::render('Timecards/Employee/ViewByJobDate', [
            'date' => $date,
            'timecards' => $timecards
        ]);
    }


}
