import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Ensure this path is correct

export default function RegisterDevice({ auth }) {
  const [status, setStatus] = useState('idle'); // More descriptive initial status
  const [device, setDevice] = useState(null);
  const [error, setError] = useState(null);

  const registerDevice = async () => {
    setStatus('registering');
    setError(null); // Clear previous errors
    setDevice(null); // Clear previous device info

    // Retrieve stored UUID if it exists
    const storedUuid = localStorage.getItem('device_uuid');
    const requestBody = {};
    if (storedUuid) {
      requestBody.uuid = storedUuid;
    }

    try {
      // Ensure the csrf-token meta tag exists in your main layout (e.g., app.blade.php)
      const csrfTokenEl = document.querySelector('meta[name="csrf-token"]');
      if (!csrfTokenEl) {
        console.error('CSRF token not found. Make sure it is set in your main layout.');
        setError('CSRF token not found. Cannot register device.');
        setStatus('error');
        return;
      }
      const csrfToken = csrfTokenEl.content;

      // Using Ziggy for route generation, ensure 'device.register' is defined
      // and Ziggy is properly configured.
      const registerUrl = window.route ? window.route('device.register') : '/device/register';


      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json', // Good practice to include Accept header
        },
        body: JSON.stringify(requestBody), // Send UUID if available
      });

      const data = await response.json();

      if (response.ok) {
        setDevice(data.device);
        setStatus(data.status); // 'created' or 'updated' from backend

        // If a new device was created, store its UUID
        if (data.status === 'created' && data.device && data.device.uuid) {
          localStorage.setItem('device_uuid', data.device.uuid);
        }
      } else {
        setError(data.error || `Request failed with status: ${response.status}`);
        setStatus('error');
      }
    } catch (err) {
      console.error("Registration request failed:", err); // Log the actual error
      setError(`Request failed: ${err.message}. Check network and API endpoint.`);
      setStatus('error');
    }
  };

  useEffect(() => {
    registerDevice();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Register Device" />

      <div className="max-w-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Device Registration Status</h1>

        {status === 'idle' && (
          <div className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
            <p className="text-gray-700 font-medium">Initializing device registration...</p>
          </div>
        )}

        {status === 'registering' && (
          <div className="p-4 bg-blue-100 border border-blue-300 rounded-md shadow-sm">
            <p className="text-blue-700 font-medium">Registering device, please wait...</p>
          </div>
        )}

        {status === 'created' && device && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-md shadow-sm text-green-700">
            <h2 className="text-xl font-semibold mb-2">Device Successfully Registered!</h2>
            <p><strong>UUID:</strong> <span className="font-mono text-sm break-all">{device.uuid}</span></p>
            <p><strong>Identifier (IP/Name):</strong> {device.name}</p>
            <p><strong>Location:</strong> {device.location}</p>
            <p><strong>Status:</strong> <span className="capitalize">{device.status}</span></p>
            <p><strong>Last Active:</strong> {new Date(device.last_active).toLocaleString()}</p>
          </div>
        )}

        {status === 'updated' && device && (
          <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md shadow-sm text-yellow-700">
            <h2 className="text-xl font-semibold mb-2">Device Already Registered & Updated!</h2>
            <p><strong>UUID:</strong> <span className="font-mono text-sm break-all">{device.uuid}</span></p>
            <p><strong>Identifier (IP/Name):</strong> {device.name}</p>
            <p><strong>Location:</strong> {device.location}</p>
            <p><strong>Status:</strong> <span className="capitalize">{device.status}</span></p>
            <p><strong>Last Active:</strong> {new Date(device.last_active).toLocaleString()}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-md shadow-sm text-red-700">
            <h2 className="text-xl font-semibold mb-2">Registration Error</h2>
            <p>{error || 'An unknown error occurred.'}</p>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
