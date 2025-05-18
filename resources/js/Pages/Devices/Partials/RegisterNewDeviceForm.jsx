import React from 'react';
import { useForm } from '@inertiajs/react';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs client-side

export default function RegisterNewDeviceForm({ className = '' }) {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    name: '',
    uuid: '',
    location: '',
    status: 'active', // Default status
  });

  const generateUuid = () => {
    setData('uuid', uuidv4());
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('devices.store'), {
      onSuccess: () => reset(), // Reset form on successful submission
    });
  };

  return (
    <section className={`p-6 bg-white border border-gray-200 rounded-lg shadow-md ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Register a New Device</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manually add a new device to the system.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Device Name / Identifier</label>
          <input
            id="name"
            name="name"
            type="text"
            value={data.name}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            autoComplete="off"
            onChange={(e) => setData('name', e.target.value)}
            required
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="uuid" className="block text-sm font-medium text-gray-700">UUID (Universally Unique Identifier)</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="uuid"
              name="uuid"
              type="text"
              value={data.uuid}
              className="flex-1 block w-full min-w-0 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Leave blank to auto-generate or click button"
              onChange={(e) => setData('uuid', e.target.value)}
            />
            <button
              type="button"
              onClick={generateUuid}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 text-sm"
            >
              Generate UUID
            </button>
          </div>
          {errors.uuid && <p className="mt-2 text-sm text-red-600">{errors.uuid}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (Optional)</label>
          <input
            id="location"
            name="location"
            type="text"
            value={data.location}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            autoComplete="off"
            onChange={(e) => setData('location', e.target.value)}
          />
          {errors.location && <p className="mt-2 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
            <option value="needs_attention">Needs Attention</option>
          </select>
          {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status}</p>}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
            disabled={processing}
          >
            {processing ? 'Registering...' : 'Register Device'}
          </button>

          {recentlySuccessful && (
            <p className="text-sm text-green-600">Device registered successfully.</p>
          )}
        </div>
      </form>
    </section>
  );
}
