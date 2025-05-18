import React, { useState } from 'react';
import { usePage, Inertia } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    const { auth, timecapReports } = usePage().props;

    const [reportName, setReportName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/timecap-reports', {
            report_name: reportName,
            description: description,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Timecap Reports
                </h2>
            }
        >
            <Head title="Timecap Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Report Name:</label>
                                    <input
                                        type="text"
                                        value={reportName}
                                        onChange={(e) => setReportName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <button type="submit">Submit</button>
                            </form>

                            <h3 className="mt-4">Your Reports</h3>
                            <ul>
                                {timecapReports.map((report) => (
                                    <li key={report.id}>{report.report_name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
