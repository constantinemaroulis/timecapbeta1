<?php

namespace App\Http\Controllers;

use App\Models\Timecards;
use App\Models\Job;
use App\Models\TimecapEmpTimecard;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

class TimecardController extends Controller
{
    public function index()
    {
        $timecards = Timecards::with('job.timecards.id')
        ->latest()
        ->paginate(25);

        return Inertia::render('Timecards/Index', [
            'timecards' => $timecards,
        ]);

    }

}
