<?php

// app/Http/Controllers/CostCodeAllocatorController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;
use App\Models\UserSession;
use App\Models\CostCode;

class CostCodeAllocatorController extends Controller
{
    public function index(Request $request, $sessionId)
    {
        // Fetch the session
        $session = Session::with('device.job.costCodes')->findOrFail($sessionId);

        // Fetch the user sessions for the clocked-in users
        $userSessions = UserSession::with('user')->where('session_id', $sessionId)
            ->whereNotNull('clock_in_time')
            ->get(['id', 'user_id', 'clock_in_time', 'clock_out_time', 'hours_worked']);

        // Fetch the cost codes associated with the job
        $costCodes = $session->device->job->costCodes;

        return inertia('CostCodeAllocator', [
            'userSessions' => $userSessions,
            'costCodes' => $costCodes,
        ]);
    }
}
