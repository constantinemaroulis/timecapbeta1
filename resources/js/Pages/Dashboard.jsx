import React, { useEffect, useState, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Haversine formula to calculate distance between two lat/lng points in feet
const calculateDistanceInFeet = (lat1, lon1, lat2, lon2) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515; // Miles
    dist = dist * 5280; // Feet
    return dist;
};

const DISTANCE_THRESHOLD_FEET = 300;

export default function Dashboard({ auth, timecards = [] }) {
    const [currentDevice, setCurrentDevice] = useState(null);
    const [deviceStatus, setDeviceStatus] = useState('loading_device'); // More specific initial status
    const [deviceError, setDeviceError] = useState(null);

    const [assignedJob, setAssignedJob] = useState(null);
    const [browserLocation, setBrowserLocation] = useState({ latitude: null, longitude: null, accuracy: null });
    const [locationError, setLocationError] = useState(null);
    const [distanceToJob, setDistanceToJob] = useState(null);
    const [startDayStatus, setStartDayStatus] = useState('idle'); // idle, checking_location, in_range, out_of_range, no_job, no_job_coords, location_permission_denied, location_error_generic

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        const date = new Date(timeString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleString('en-US', {
            hour: 'numeric', minute: 'numeric', hour12: true,
            month: 'short', day: 'numeric', year: 'numeric',
        });
    };

    const identifyAndLoadDevice = useCallback(async () => {
        setDeviceStatus('loading_device');
        setDeviceError(null);
        setAssignedJob(null); // Reset job info on new identification attempt

        const storedUuid = localStorage.getItem('device_uuid');
        const requestBody = {};
        if (storedUuid) requestBody.uuid = storedUuid;

        try {
            const csrfTokenEl = document.querySelector('meta[name="csrf-token"]');
            if (!csrfTokenEl) {
                console.error('CSRF token not found.');
                setDeviceError('Configuration error: CSRF token missing.');
                setDeviceStatus('error_device');
                return;
            }
            const csrfToken = csrfTokenEl.content;
            const registerUrl = window.route ? window.route('device.register') : '/device/register';

            const response = await fetch(registerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Accept': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();

            if (response.ok) {
                setCurrentDevice(data.device);
                setDeviceStatus(data.status === 'created' ? 'device_registered' : 'device_updated');
                if (data.device && data.device.uuid && data.status === 'created') {
                    localStorage.setItem('device_uuid', data.device.uuid);
                }
                if (data.assignedJob) { // Check if assignedJob data is returned
                    setAssignedJob(data.assignedJob);
                } else if (data.device && data.device.job_id) {
                    // If job_id exists but no job data, it implies job might not have coords or wasn't loaded
                    setStartDayStatus('no_job_coords'); // Or a more specific status
                } else {
                    setStartDayStatus('no_job_assigned');
                }
            } else {
                setDeviceError(data.error || `Device registration failed: ${response.statusText || response.status}`);
                setDeviceStatus('error_device');
            }
        } catch (err) {
            console.error("Device identification request failed:", err);
            setDeviceError(`Network error: ${err.message}`);
            setDeviceStatus('error_device');
        }
    }, []); // useCallback dependencies

    useEffect(() => {
        identifyAndLoadDevice();
    }, [identifyAndLoadDevice]);

    // Effect for geolocation and distance calculation
    useEffect(() => {
        if (currentDevice && assignedJob && assignedJob.latitude && assignedJob.longitude) {
            setStartDayStatus('checking_location');
            setLocationError(null);
            setDistanceToJob(null);

            if (!navigator.geolocation) {
                setLocationError("Geolocation is not supported by your browser.");
                setStartDayStatus('location_error_generic');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;
                    setBrowserLocation({ latitude, longitude, accuracy });

                    const distFeet = calculateDistanceInFeet(
                        latitude, longitude,
                        parseFloat(assignedJob.latitude), parseFloat(assignedJob.longitude)
                    );
                    setDistanceToJob(distFeet);

                    if (currentDevice.job_id === assignedJob.id) { // Double check assignment
                        if (distFeet <= DISTANCE_THRESHOLD_FEET) {
                            setStartDayStatus('in_range_can_start');
                        } else {
                            setStartDayStatus('out_of_range');
                        }
                    } else {
                         setStartDayStatus('device_not_assigned_to_this_job'); // Should ideally not happen if data is consistent
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    let status;
                    let msg;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            status = 'location_permission_denied';
                            msg = "Location permission denied. Please enable location services for this site.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            status = 'location_error_unavailable';
                            msg = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            status = 'location_error_timeout';
                            msg = "The request to get user location timed out.";
                            break;
                        default:
                            status = 'location_error_generic';
                            msg = "An unknown error occurred while trying to get location.";
                            break;
                    }
                    setLocationError(msg);
                    setStartDayStatus(status);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        } else if (currentDevice && !assignedJob && currentDevice.job_id) {
            setStartDayStatus('no_job_coords'); // Job assigned but no coords from backend
        } else if (currentDevice && !currentDevice.job_id) {
            setStartDayStatus('no_job_assigned');
        }
    }, [currentDevice, assignedJob]);


    const renderStartDayStatus = () => {
        switch (startDayStatus) {
            case 'idle':
                return <p className="text-gray-500">Initializing start day check...</p>;
            case 'loading_device':
                 return <p className="text-gray-500">Loading device info for start day check...</p>;
            case 'checking_location':
                return <p className="text-blue-600">Checking your current location...</p>;
            case 'in_range_can_start':
                return (
                    <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-md">
                        <p className="font-semibold">You are within {DISTANCE_THRESHOLD_FEET} feet of the job site ({assignedJob?.name}).</p>
                        <p>Distance: {distanceToJob?.toFixed(0)} feet. Accuracy: {browserLocation.accuracy?.toFixed(0)} meters.</p>
                        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Start Day
                        </button>
                    </div>
                );
            case 'out_of_range':
                return (
                    <div className="p-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md">
                        <p className="font-semibold">You are out of range to start the day for job: {assignedJob?.name}.</p>
                        <p>Distance: {distanceToJob?.toFixed(0)} feet. Required: within {DISTANCE_THRESHOLD_FEET} feet.</p>
                        <p className="text-xs">Browser location accuracy: {browserLocation.accuracy?.toFixed(0)} meters.</p>
                    </div>
                );
            case 'no_job_assigned':
                return <p className="text-gray-600">This device is not currently assigned to a job.</p>;
            case 'no_job_coords':
                return <p className="text-orange-600">Device is assigned to job "{assignedJob?.name || currentDevice?.job?.name || 'Unknown Job'}", but job location coordinates are missing.</p>;
            case 'device_not_assigned_to_this_job':
                 return <p className="text-red-600">Device-Job mismatch. Please contact support.</p>;
            case 'location_permission_denied':
            case 'location_error_unavailable':
            case 'location_error_timeout':
            case 'location_error_generic':
                return (
                    <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
                         <p className="font-semibold">Could not determine your location:</p>
                         <p>{locationError}</p>
                    </div>
                );
            default:
                return <p className="text-gray-500">Waiting for device and job information...</p>;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Worker Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 space-y-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Start Day Check Section */}
                <div className="bg-white shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Start Day Check</h3>
                    {renderStartDayStatus()}
                </div>

                {/* Current Device Information Section */}
                <div className="bg-white shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Device Information</h3>
                    {deviceStatus === 'loading_device' && <p className="text-gray-600">Loading device information...</p>}
                    {deviceStatus === 'error_device' && (
                        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
                            <p className="font-medium">Error loading device information:</p>
                            <p className="text-sm">{deviceError || 'An unknown error occurred.'}</p>
                        </div>
                    )}
                    {(deviceStatus === 'device_registered' || deviceStatus === 'device_updated') && currentDevice && (
                        <dl className="space-y-3 text-sm text-gray-700">
                            <div>
                                <dt className="font-medium text-gray-500">Registration Status:</dt>
                                <dd className="mt-1"><span className={`capitalize px-2 py-1 rounded-full text-xs font-semibold ${deviceStatus === 'device_registered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{deviceStatus.replace('device_', '')}</span></dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Device UUID:</dt>
                                <dd className="mt-1 font-mono text-xs text-gray-600 break-all">{currentDevice.uuid}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Identifier (IP/Name):</dt>
                                <dd className="mt-1">{currentDevice.name}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Detected Location:</dt>
                                <dd className="mt-1">{currentDevice.location}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Device Status:</dt>
                                <dd className="mt-1 capitalize">{currentDevice.status}</dd>
                            </div>
                             <div>
                                <dt className="font-medium text-gray-500">Assigned Job:</dt>
                                <dd className="mt-1">{assignedJob ? `${assignedJob.name} (ID: ${assignedJob.id})` : (currentDevice?.job?.name || 'None')}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Last Active:</dt>
                                <dd className="mt-1">{formatTime(currentDevice.last_active)}</dd>
                            </div>
                        </dl>
                    )}
                </div>

                {/* User Sessions - Placeholder */}
                <div className="bg-white shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Clock-In Data</h3>
                    <p className="text-gray-500">Session data will be displayed here.</p>
                </div>

                {/* Timecard Table */}
                <div className="bg-white shadow-sm sm:rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Timecards</h3>
                        {window.route && route().has('timecards.export.pdf') && (
                             <a
                                href={route('timecards.export.pdf')}
                                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-800 focus:outline-none focus:border-green-800 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                Export PDF
                            </a>
                        )}
                    </div>

                    {(!timecards || timecards.length === 0) ? (
                        <p className="text-gray-500">{!timecards ? "Loading timecards..." : "No timecards found."}</p>
                    ) : (
                        <div className="overflow-x-auto border border-gray-200 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {timecards.map((tc, index) => (
                                        <tr key={tc.id || tc.tc_timecard_id || `timecard-${index}`} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                                                {tc.employee
                                                    ? `${tc.employee.tc_emp_detail_first_name || ''} ${tc.employee.tc_emp_detail_last_name || ''}`.trim() || 'N/A'
                                                    : 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-gray-600">{formatTime(tc.tc_timecard_start)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-gray-600">{tc.tc_timecard_end ? formatTime(tc.tc_timecard_end) : 'In Progress'}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    tc.tc_timecard_status === 'clocked_in' ? 'bg-green-100 text-green-800' :
                                                    tc.tc_timecard_status === 'clocked_out' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {tc.tc_timecard_status ? tc.tc_timecard_status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-indigo-600 hover:text-indigo-800">
                                                {window.route && route().has('timecards.index') && (
                                                    <Link href={route('timecards.index')}>
                                                        View All
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
