import React from 'react';
import { Head } from '@inertiajs/react';

const TimecardIndex = ({ timecards }) => {
    // Full path for files in `storage/timecards/*`
    const getFileUrl = (path) => {
        if (!path) return null;
        return `/storage/${path}`;
    };

    const formatTime = (datetime) => {
        if (!datetime) return '-';
        const date = new Date(datetime);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title="Timecard" />
            <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-4">Timecard Records</h1>

                <table className="min-w-full border table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2">Job</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timecards?.data?.length ? (
                            timecards.data.map((tc) => (
                                <tr key={tc.id || tc.timecard_id} className="border-t hover:bg-gray-50">
                                    <td className="p-2">
                                        {tc.job
                                            ? `${tc.job.name}`
                                            : 'N/A'}
                                    </td>
                                    <td className="p-2">{tc.status}</td>
                                    <td className="p-2">{tc.timecard_start_date}</td>
                                    <td className="p-2 capitalize">{tc.tc_timecard_status}</td>
                                    <td className="p-2">
                                        {tc.tc_emp_timecard_start_photo ? (
                                            <a
                                                href={getFileUrl(tc.tc_emp_timecard_start_photo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">None</span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {tc.tc_emp_timecard_end_photo ? (
                                            <a
                                                href={getFileUrl(tc.tc_emp_timecard_end_photo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">None</span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {tc.tc_emp_timecard_start_signature ? (
                                            <a
                                                href={getFileUrl(tc.tc_emp_timecard_start_signature)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 underline"
                                            >
                                                Sign
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">None</span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {tc.tc_emp_timecard_end_signature ? (
                                            <a
                                                href={getFileUrl(tc.tc_emp_timecard_end_signature)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 underline"
                                            >
                                                Sign
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">None</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    No timecards found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TimecardIndex;
