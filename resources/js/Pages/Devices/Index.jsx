import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Ensure this path is correct
import RegisterNewDeviceForm from '@/Pages/Devices/Partials/RegisterNewDeviceForm'; // Assuming you save the new form here

// Main component for displaying the list of devices
export default function DevicesIndex({ auth, devices = [], jobs = [], flash }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Device Management</h2>}
    >
      <Head title="Device Management" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Section for Registering a New Device */}
          <RegisterNewDeviceForm className="mb-8" />

          {/* Section for Listing Existing Devices */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-2xl font-bold mb-6 text-gray-700">Registered Devices</h1>

              {/* Flash message display */}
              {flash && flash.message && (
                <div className="mb-4 p-4 text-sm bg-green-100 text-green-700 rounded-md shadow">
                  {flash.message}
                </div>
              )}
              {flash && flash.error && (
                <div className="mb-4 p-4 text-sm bg-red-100 text-red-700 rounded-md shadow">
                  {flash.error}
                </div>
              )}

              {devices.length === 0 ? (
                <p className="text-gray-500">No devices registered yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UUID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identifier (IP/Name)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attached Job</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {devices.map(device => (
                        <tr key={device.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-gray-700 break-all">{device.uuid}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-gray-700">{device.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-gray-600">{device.location || 'N/A'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              device.status === 'active' ? 'bg-green-100 text-green-800' :
                              device.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                              device.status === 'maintenance' ? 'bg-blue-100 text-blue-800' :
                              device.status === 'needs_attention' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {device.status ? device.status.charAt(0).toUpperCase() + device.status.slice(1) : 'Unknown'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-gray-600">{device.last_active ? new Date(device.last_active).toLocaleString() : 'N/A'}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-gray-600">{device.job?.name || <span className="text-gray-400 italic">Unassigned</span>}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <AttachForm device={device} jobs={jobs} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

// Component for the form to attach a device to a job
function AttachForm({ device, jobs }) {
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    job_id: device.job_id || '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('devices.attach', device.id), {
      preserveScroll: true,
      onSuccess: () => {
        // Message will be handled by Inertia flash
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <select
        id={`job_id_for_device_${device.id}`}
        value={data.id}
        onChange={e => setData('job_id', e.target.value)}
        className="w-full sm:w-auto border-gray-300 rounded-md shadow-sm p-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        disabled={processing}
      >
        <option value="">Select Job</option>
        {jobs.map(job => (
          <option key={job.id} value={job.id}>{job.name}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={processing || !data.job_id}
        className={`px-3 py-1.5 text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${processing || !data.job_id ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
      >
        {processing ? 'Assigning...' : 'Assign'}
      </button>
      {errors.job_id && <p className="text-xs text-red-500 mt-1">{errors.job_id}</p>}
      {/* {recentlySuccessful && !processing && <p className="text-xs text-green-500 mt-1">Assigned!</p>} */}
      {/* Removed inline success message as flash should handle it */}
    </form>
  );
}
