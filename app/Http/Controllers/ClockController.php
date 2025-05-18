<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class ClockController extends Controller
{
    public function show()
    {
        // Get the current time in New York
        $timeInNewYork = Carbon::now('America/New_York');
        //$formattedTime = date('h:i:s');

        // Format the time without seconds. For example, "h:i A" yields "3:05 PM"
        // 'h' = 12-hour format, 'i' = minutes, 'A' = AM/PM
        $formattedTime = $timeInNewYork->format('H:i a');
        
        return response()->json(['time' => $formattedTime]);
    }
}
