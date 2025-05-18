<?php
namespace App\Http\Controllers;

use App\Models\TimecapEmp;
use App\Models\TimecapEmpTimecard;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class TimecardController extends Controller
{
    
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            // 'tc_timecard_start' => 'required',
            'tc_emp_ssn6' => 'required|exists:timecap_emp,tc_emp_ssn6',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'type' => 'required|in:in,out', // Ensure 'type' is 'in' or 'out'
            //'job_id' => 'exists:jobs,id', // Add job_id validation
        ]);

        // Retrieve the employee
        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();

        // Check if the employee has an open timecard (clocked in but not clocked out)
        $openTimecard = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
                                            ->whereNull('tc_timecard_end')
                                            ->latest()
                                            ->first();

        // Generate file name
        $fileName = time() . '_' . $request->tc_emp_ssn6 . '_clock_' . $request->type . '.' . $request->photo->extension();

        // Store the uploaded photo
        $request->photo->move(public_path('uploads'), $fileName);

        $timestamp = Carbon::now('America/New_York');
        // Adjust clock-in or clock-out time based on rules
        $adjustedTimestamp = $this->applyRules($employee->id, $timestamp, $request->type);

        // Get the current timestamp in America/New_York timezone
        


        if ($openTimecard && $request->type === 'out') { 
            // Employee is clocking out
            $openTimecard->tc_timecard_end = $timestamp;
            $openTimecard->tc_adjusted_timecard_end = $adjustedTimestamp;
            $openTimecard->tc_emp_timecard_end_photo = $fileName;
            $openTimecard->job_id = $request->job_id;
            $openTimecard->save();
        } elseif (!$openTimecard && $request->type === 'in') {
            $timecard = TimecapEmpTimecard::create([
                'tc_emp_id' => $employee->tc_emp_id,
                'tc_job_costcodes' => $request->tc_job_costcodes ?: null,
                'tc_timecard_start' => $timestamp->now(),
                'tc_adjusted_timecard_start' => $adjustedTimestamp,
                'tc_timecard_end' => $request->tc_timecard_end ?: null,
                'tc_emp_timecard_start_photo' => $fileName,
                'tc_timecard_submitted' => 'pending',
                'tc_timecard_approved' => 'pending',
                'tc_timecard_status' => 'pending',
                'job_id' => $request->job_id, // Set
            ]);
        } else {
            // Invalid request
            return response()->json(['error' => 'Invalid clock-in/clock-out request'], 400);
        }

        return response()->json(['success' => true, 'message' => 'Timecard Created Successfully']);
    }

    private function applyRules($jobId, $timestamp, $type) { 
        // Fetch job-specific and company-wide settings
        $jobSettings = Setting::where('job_id', $jobId)->orWhereNull('job_id')->get(); 
        
        foreach ($jobSettings as $setting) { 
            if ($setting->type === $type) { 
                switch ($setting->rule) { 
                    case 'round_to_nearest': 
                        return $timestamp->copy()->startOfHour();
                    
                        // Example: Rounds to the nearest hour
                    case 'round_down':
                        return $timestamp->copy()->minute(0); 
                        
                        // Example: Rounds down to the previous hour 
                } 
            } 
        } 
                
        return $timestamp; // No rules applied, return the original timestamp
    }
            

    public function showClockInForm()
    {
        return Inertia::render('ClockIn');
    }

    // // **Add the validateSsn method here**
    // public function validateSsn(Request $request)
    // {
    //     $request->validate([
    //         'tc_emp_ssn6' => 'required',
    //     ]);

    //     $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();
    //     //$exists = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->exists();

    //     if ($employee) { // Check if the employee has an open timecard
    //         $isClockedIn = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
    //                                             ->whereNull('tc_timecard_end')
    //                                             ->exists();
    //         return response()->json(['valid' => true, 'isClockedIn' => $isClockedIn]);
    //     } else { 
    //         return response()->json(['valid' => false]);
    //     }

    //     //return response()->json(['valid' => $exists]);
    // }
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

        // Extract the base64 image data
        $signatureData = $request->input('signature');
        if (!$signatureData) { 
            return response()->json([
                'error' => 'Signature data is missing'], 
                400
            ); 
        }

        // Decode the base64 image 
        $signatureData = str_replace('data:image/png;base64,', '', $signatureData); 
        $signatureData = str_replace(' ', '+', $signatureData); 
        $signature = base64_decode($signatureData); 

        // Generate file name 
        $fileName = time() . '_' . $request->tc_emp_ssn6 . '_signature_' . $request->type . '.png'; 

        // Save the image to the public/uploads directory 
        $filePath = public_path('uploads') . '/' . $fileName; 
        file_put_contents($filePath, $signature);

        // **Retrieve the employee using tc_emp_ssn6**
        $employee = TimecapEmp::where('tc_emp_ssn6', $request->tc_emp_ssn6)->first();

        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        } 
        
        // Retrieve the relevant timecard
        $timecardQuery = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)
                                            ->latest();
        
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
        } elseif ($request->type === 'out') {
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
            return response()->json(['error' => 'Invalid clock-in/clock-out request'], 400);
        }

        /* **Retrieve the latest timecard for this employee using tc_emp_id**
            $timecard = TimecapEmpTimecard::where('tc_emp_id', $employee->tc_emp_id)->latest()->first(); 

            if ($timecard) { 
                $timecard->tc_emp_timecard_start_signature = $fileName; 
                $timecard->save(); 
            } else { 
                return response()->json(['error' => 'Timecard not found'], 404); 
            }
        */ 

        return response()->json(['success' => true, 'message' => 'Signature Saved Successfully']);
    }

}
