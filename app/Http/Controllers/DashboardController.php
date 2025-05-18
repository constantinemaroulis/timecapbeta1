<?php

namespace App\Http\Controllers;

use App\Models\TimecapEmp;
use App\Models\TimecapEmpTimecard;
use App\Models\TimecapEmpDetail;
use App\Models\TimecapReport;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;


class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();


        // Latest 10 timecards
        $timecards = TimecapEmpTimecard::with('employee')->latest()->take(10)->get();

        // Reports by this user (if using reports)
       $timecapReports = TimecapReport::where('user_id', $user->id)->get();

        // Optional: List of employees (if needed)
        $employees = TimecapEmp::with('details')->get();

        // Optional admin data (customize if using roles/permissions)
        $data = [];
        // if ($user->can('view dashboard')) {
        //     $data['clockedIn'] = $this->getClockedInUsers($jobId);
        //     $data['clockedOut'] = $this->getClockedOutUsers($jobId);
        //     $data['jobInformation'] = $this->getJobInformation($jobId);
        // }

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'timecards' => $timecards,
            'timecapReports' => $timecapReports,
            'employees' => $employees,
            'data' => $data,
        ]);
    }

    private function getClockedInUsers()
    {
        return TimecapEmpTimecard::with('employee')
            ->whereNull('tc_timecard_end')
            ->get();
    }

    private function getClockedOutUsers($jobId)
    {
        return TimecapEmpTimecard::with('employee')
            ->whereDate('tc_timecard_end', Carbon::today())
            ->get();
    }

}
