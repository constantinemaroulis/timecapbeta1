import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function JobsIndex({ auth, jobs }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Management" />
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Jobs</h1>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Coordinates</th>
              <th className="p-2">Distance (mi)</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id} className="border-t">
                <td className="p-2 font-semibold">{job.name}</td>
                <td className="p-2">{job.description}</td>
                <td className="p-2 text-xs">{job.latitude}, {job.longitude}</td>
                <td className="p-2">{job.distance_threshold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
