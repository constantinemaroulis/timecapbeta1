<?php

// app/Http/Controllers/DeviceController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;
use App\Models\Job; // Assuming your Job model is App\Models\Job
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class DeviceController extends Controller {
    public function autoRegister(Request $request) {
        $ipAddress = $request->ip();
        $locationData = [];
        $errorMessage = null;

        try {
            $response = Http::timeout(5)->get('http://ip-api.com/json/' . $ipAddress);
            if ($response->successful()) {
                $locationData = $response->json();
                if (!isset($locationData['status']) || $locationData['status'] !== 'success') {
                    $errorMessage = 'Location API did not return success. Status: ' . ($locationData['status'] ?? 'Unknown') . (isset($locationData['message']) ? ' Message: ' . $locationData['message'] : '');
                    Log::warning("DeviceController::autoRegister - IP API non-success: " . $errorMessage . " for IP: " . $ipAddress);
                }
            } else {
                $errorMessage = 'Failed to connect to location API. HTTP Status: ' . $response->status();
                Log::error("DeviceController::autoRegister - IP API connection failed: " . $errorMessage . " for IP: " . $ipAddress);
            }
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            $errorMessage = 'Connection to location API timed out or failed: ' . $e->getMessage();
            Log::error("DeviceController::autoRegister - IP API ConnectionException: " . $errorMessage . " for IP: " . $ipAddress);
        } catch (\Exception $e) {
            $errorMessage = 'An unexpected error occurred while fetching location: ' . $e->getMessage();
            Log::error("DeviceController::autoRegister - IP API Generic Exception: " . $errorMessage . " for IP: " . $ipAddress);
        }

        $deviceName = $ipAddress;
        $deviceLocation = 'Unknown';

        if ($locationData && isset($locationData['status']) && $locationData['status'] === 'success') {
            $city = $locationData['city'] ?? '';
            $region = $locationData['regionName'] ?? '';
            $country = $locationData['countryCode'] ?? '';
            $deviceName = $locationData['query'] ?? $ipAddress;
            $deviceLocation = trim(implode(', ', array_filter([$city, $region, $country])), ", ");
            if (empty($deviceLocation)) {
                $deviceLocation = 'Location data incomplete';
            }
        } else {
            $deviceLocation = $errorMessage ?: 'Error determining location';
        }

        $existingUuid = $request->input('uuid');
        $device = null;
        $actionStatus = 'error';
        $assignedJobData = null;

        if ($existingUuid) {
            $device = Device::with('job')->where('uuid', $existingUuid)->first(); // Eager load job
            if ($device) {
                $device->last_active = now();
                $device->name = $deviceName;
                $device->location = $deviceLocation;
                $device->save();
                $actionStatus = 'updated';
            }
        }

        if (!$device) {
            $newUuid = (string) Str::uuid();
            $device = Device::create([
                'uuid' => $newUuid,
                'name' => $deviceName,
                'location' => $deviceLocation,
                'status' => 'active',
                'last_active' => now(),
                'job_id' => null,
            ]);
            // After creating, load the (non-existent) job relationship to have a consistent structure
            $device->load('job');
            $actionStatus = 'created';
        }

        // If device exists and has a job_id, fetch job details including coordinates
        if ($device && $device->job_id && $device->job) {
            // Assuming Job model has latitude and longitude fields
            // You might want to select specific fields for security/performance
            $assignedJobData = [
                'id' => $device->job->id,
                'name' => $device->job->name,
                'latitude' => $device->job->latitude,   // Ensure these fields exist on your Job model/table
                'longitude' => $device->job->longitude, // Ensure these fields exist on your Job model/table
            ];
        }

        if ($device) {
             return response()->json([
                'device' => $device,
                'status' => $actionStatus,
                'assignedJob' => $assignedJobData // Add assigned job data to the response
            ], $actionStatus === 'created' ? 201 : 200);
        }

        return response()->json(['error' => $errorMessage ?: 'Unable to register or update device.'], 400);
    }

    public function index() {
        $devices = Device::with('job')->latest('last_active')->get();
        $jobs = Job::select('id', 'name')->get();

        return Inertia::render('Devices/Index', [
            'devices' => $devices,
            'jobs' => $jobs,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'uuid' => [
                'nullable',
                'string',
                'uuid',
                Rule::unique('devices', 'uuid')->ignore($request->uuid ? Device::where('uuid', $request->uuid)->first() : null),
            ],
            'location' => 'nullable|string|max:255',
            'status' => 'required|string|in:active,inactive,maintenance,needs_attention',
            'job_id' => 'nullable|exists:job,id', // Corrected table name to 'job'
        ]);

        if (empty($validatedData['uuid'])) {
            $validatedData['uuid'] = (string) Str::uuid();
        }

        $validatedData['last_active'] = now();
        $validatedData['job_id'] = $request->input('job_id') ?: null;


        Device::create($validatedData);

        return redirect()->route('devices.index')->with('message', 'Device registered successfully.');
    }

    public function attachToJob(Request $request, $id) {
        $request->validate(['job_id' => 'required|exists:job,id']); // Corrected table name

        $device = Device::findOrFail($id);
        $device->job_id = $request->job_id;
        $device->save();

        return redirect()->back()->with('message', 'Device attached to job successfully.');
    }

    public function destroy(Device $device)
    {
        $device->delete();
        return redirect()->route('devices.index')->with('message', 'Device deleted successfully.');
    }
}
