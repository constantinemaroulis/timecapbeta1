<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::all();
        return response()->json($settings);
    }

    public function create()
    {
        return view('settings.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'nullable|exists:jobs,id',
            'type' => 'required|string',
            'rule' => 'required|string',
            'adjustment_time' => 'nullable|date_format:H:i:s',
        ]);

        Setting::create($request->all());
        return response()->json($setting);
    }
}
