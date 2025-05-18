<?php
// app/Http/Controllers/SessionController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;
use App\Models\Device;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;


class SessionController extends Controller
{
    public function startDay(Request $request)
    {
        $request->validate([
            'device_uuid' => 'required|uuid|exists:devices,uuid',
        ]);

        $device = Device::where('uuid', $request->device_uuid)->firstOrFail();

        // Ensure user has the 'site super' or 'PM' role
        if (!Auth::user()->hasRole(['site super', 'PM'])) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        // Check if previous day is closed
        $lastSession = $device->sessions()->latest()->first();
        if ($lastSession && $lastSession->status === 'open') {
            return response()->json(['error' => 'Previous day not closed.'], 400);
        }

        $session = Session::create([
            'device_id' => $device->id,
            'job_id' => $device->job_id,
            'date' => now()->toDateString(),
            'start_time' => now()->toTimeString(),
            'previous_day_closed' => $lastSession ? ($lastSession->status === 'closed') : true,
        ]);

        $device->update([
            'day_started' => true,
            'status' => 'active',
            'last_active' => now(),
        ]);

        return response()->json(['session' => $session], 201);
    }

    public function endDay(Request $request)
    {
        $request->validate([
            'device_uuid' => 'required|uuid|exists:devices,uuid',
        ]);

        $device = Device::where('uuid', $request->device_uuid)->firstOrFail();

        // Ensure user has the 'site super' or 'PM' role
        if (!Auth::user()->hasRole(['site super', 'PM'])) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        $session = $device->sessions()->where('status', 'open')->firstOrFail();

        // Check if all requirements are fulfilled
        if (!$session->cost_coding_fulfilled) {
            return response()->json(['error' => 'Cost coding not fulfilled.'], 400);
        }

        $expenseAllocationMandatory = Setting::where('key', 'expense_allocation_mandatory')->value('value') === 'true';
        if ($expenseAllocationMandatory && !$session->expenses_allocated) {
            return response()->json(['error' => 'Expenses not allocated.'], 400);
        }

        $session->update([
            'end_time' => now()->toTimeString(),
            'status' => 'closed',
        ]);

        $device->update([
            'day_started' => false,
            'status' => 'idle',
            'last_active' => now(),
        ]);

        return response()->json(['message' => 'Day ended successfully.']);
    }
}
