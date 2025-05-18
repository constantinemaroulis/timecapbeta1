<?php
// app/Http/Controllers/UserSessionController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSession;
use Illuminate\Support\Facades\Auth;

class UserSessionController extends Controller
{
    public function clockIn(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'required|exists:sessions,id',
            'clock_in_time' => 'required|date_format:H:i',
        ]);

        UserSession::create([
            'session_id' => $validated['session_id'],
            'user_id' => Auth::id(),
            'clock_in_time' => $validated['clock_in_time'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Clocked in successfully!');
    }

    public function clockOut(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'required|exists:sessions,id',
            'clock_out_time' => 'required|date_format:H:i',
        ]);

        $userSession = UserSession::where('session_id', $validated['session_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $userSession->update(['clock_out_time' => $validated['clock_out_time']]);

        return redirect()->route('dashboard')->with('success', 'Clocked out successfully!');
    }
}
