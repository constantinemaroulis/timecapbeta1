import React from 'react';
import { Head, Link } from '@inertiajs/react';

const DailyTimecardSummary = ({ groupedTimecards }) => {
    return (
        <>
            <Head title="Daily Timecard Summary" />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Daily Timecard Summary</h1>

                {Object.entries(groupedTimecards).map(([key, timecards]) => {
                    const { job } = timecards[0] || {};
                    const date = new Date(timecards[0]?.tc_timecard_start).toDateString();

                    return (
                        <div key={key} className="mb-8 border rounded-lg shadow-sm bg-white">
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold">
                                    {job?.name || 'Unknown Job'} - {date}
                                </h2>
                                <div className="mt-2 flex gap-4">
                                    <Link
                                        href={`/timecards/view/${job?.id}/${date}`}
                                        className="text-blue-600 underline"
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        href={`/timecards/export/${job?.id}/${date}`}
                                        className="text-green-600 underline"
                                    >
                                        Export PDF
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 text-sm">
                                <ul>
                                    {timecards.map(tc => (
                                        <li key={tc.tc_timecard_id} className="mb-2">
                                            <strong>{tc.employee?.tc_emp_name || 'N/A'}</strong> — In: {tc.tc_timecard_start ?? '-'} | Out: {tc.tc_timecard_end ?? '-'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default DailyTimecardSummary;
