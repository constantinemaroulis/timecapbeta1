<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TimecapEmp;
use Illuminate\Support\Facades\Validator;

class WorkerController extends Controller
{
    public function store(Request $request)
    {
        $this->authorize('add worker');

        $validator = Validator::make($request->all(), [
            'erp_emp_id' => 'required|unique:timecap_emp,erp_emp_id',
            'tc_emp_ssn6' => 'required|unique:timecap_emp,tc_emp_ssn6',
            // Include other necessary fields
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        TimecapEmp::create([
            'erp_emp_id' => $request->erp_emp_id,
            'tc_emp_ssn6' => $request->tc_emp_ssn6,
            // Include other necessary fields
        ]);

        return redirect()->back()->with('success', 'Worker added successfully.');
    }
}
