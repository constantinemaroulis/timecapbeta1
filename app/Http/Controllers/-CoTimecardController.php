<?php
namespace App\Http\Controllers;

use App\Models\TimecapEmp;
use App\Models\TimecapEmpTimecard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class TimecardController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'tc_emp_ssn6' => 'required|exists:timecap_emp,tc_emp_ssn6',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'type' => 'required|in:in,out', // Ensure 'type' is 'in' or 'out'
        ]);

        // Retrieve the employee
        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();

        // Check if the employee has an open timecard (clocked in but not clocked out)
        $openTimecard = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
            ->whereNull('tc_timecard_end')
            ->latest()
            ->first();

        // Generate file name for the photo
        $fileName = time() . '_' . $request->tc_emp_ssn6 . '_clock_' . $request->type . '.' . $request->photo->extension();
        $request->photo->move(public_path('uploads'), $fileName);

        // Get the current timestamp in America/New_York timezone
        $timestamp = Carbon::now('America/New_York');

        if ($openTimecard && $request->type === 'out') {
            // Employee is clocking out
            $openTimecard->tc_timecard_end = $timestamp;
            $openTimecard->tc_emp_timecard_end_photo = $fileName;
            $openTimecard->save();
        } elseif (!$openTimecard && $request->type === 'in') {
            // Employee is clocking in
            $timecard = TimecapEmpTimecard::create([
                'tc_emp_id' => $employee->tc_emp_id,
                'tc_timecard_start' => $timestamp,
                'tc_emp_timecard_start_photo' => $fileName,
                'tc_timecard_submitted' => 'pending',
                'tc_timecard_approved' => 'pending',
                'tc_timecard_status' => 'pending',
            ]);
        } else {
            // Invalid action
            return response()->json(['error' => 'Invalid clock-in/clock-out action.'], 400);
        }

        return response()->json(['success' => true, 'message' => 'Timecard updated successfully.']);
    }

    public function validateSsn(Request $request)
    {
        $request->validate([
            'tc_emp_ssn6' => 'required|exists:timecap_emp,tc_emp_ssn6',
        ]);

        try {
            $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();

            if ($employee) {
                // Check if the employee has an open timecard
                $isClockedIn = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
                    ->whereNull('tc_timecard_end')
                    ->exists();

                return response()->json(['valid' => true, 'isClockedIn' => $isClockedIn]);
            } else {
                return response()->json(['valid' => false], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error validating SSN: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while validating the SSN. Please try again.'], 500);
        }
    }

    public function saveSignature(Request $request)
    {
        $request->validate([
            'tc_emp_ssn6' => 'required|exists:timecap_emp,tc_emp_ssn6',
            'signature' => 'required',
            'type' => 'required|in:in,out',
        ]);

        // Decode the base64 image
        $signatureData = $request->input('signature');
        if (!$signatureData) {
            return response()->json(['error' => 'Signature data is missing'], 400);
        }
        $signatureData = str_replace('data:image/png;base64,', '', $signatureData);
        $signatureData = str_replace(' ', '+', $signatureData);
        $signature = base64_decode($signatureData);

        // Generate file name
        $fileName = time() . '_' . $request->tc_emp_ssn6 . '_signature_' . $request->type . '.png';

        // Save the image to the public/uploads directory
        $filePath = public_path('uploads') . '/' . $fileName;
        file_put_contents($filePath, $signature);

        // Retrieve the employee using tc_emp_ssn6
        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();
        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        // Retrieve the relevant timecard
        $timecardQuery = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)->latest();

        if ($request->type === 'in') {
            $timecard = $timecardQuery->whereNotNull('tc_timecard_start')
                        ->whereNull('tc_emp_timecard_start_signature')
                        ->first();
            
            if ($timecard) {
                $timecard->tc_emp_timecard_start_signature = $fileName;
                $timecard->save();
            } else {
                return response()->json(['error' => 'Timecard not found for clock-in signature'], 404);
            }
        } else if ($request->type === 'out') {
            $timecard = $timecardQuery->whereNotNull('tc_timecard_end')
                        ->whereNull('tc_emp_timecard_end_signature')
                        ->first();
            
            if ($timecard) {
                $timecard->tc_emp_timecard_end_signature = $fileName;
                $timecard->save();
            } else {
                return response()->json(['error' => 'Timecard not found for clock-out signature'], 404);
            }
        } else {
            return response()->json(['error' => 'Invalid type'], 400);
        }

        return response()->json(['success' => true, 'message' => 'Signature Saved Successfully']);
    }

    public function showClockInForm()
    {
        return Inertia::render('ClockIn');
    }
}
