<?php

namespace App\Http\Controllers;

use App\Models\TimecapReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TimecapReportController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $timecapReports = TimecapReport::where('user_id', $user->id)->get();

        return Inertia::render('Timecap-Reports/Index', [
            'auth' => ['user' => $user],
            'timecapReports' => $timecapReports,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'report_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $timecapReport = new TimecapReport([
            'report_name' => $request->report_name,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        $timecapReport->save();

        return redirect()->route('timecap.reports.index');
    }
}
