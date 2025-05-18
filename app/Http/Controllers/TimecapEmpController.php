<?php

namespace App\Http\Controllers;

use App\Imports\TimecapEmpImport;
use App\Imports\TimecapEmpDetailImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Inertia\Inertia;

class TimecapEmpController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,xlsx'
        ]);

        // First, import data into timecap_emp and get the imported data
        $empImport = new TimecapEmpImport();
        Excel::import($empImport, $request->file('file'));

        // Next, use the imported data to import into timecap_emp_details
        $empDetailImport = new TimecapEmpDetailImport($empImport->importedIds);
        Excel::import($empDetailImport, $request->file('file'));

        return redirect()->back()->with('success', 'Data Imported Successfully');
    }

    public function showImportForm()
    {
        return Inertia::render('ImportForm');
    }
}
