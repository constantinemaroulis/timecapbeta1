import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const StartDay = ({ jobs }) => {
    const [selectedJobId, setSelectedJobId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedJobId === '' && jobs.length > 0) {
            setSelectedJobId(jobs[0].id); // Preselect the first job
        }
    }, [jobs]);

    const handleJobSelection = (e) => {
        setSelectedJobId(e.target.value);
    };

    // const handleStartDay = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(async (position) => {
    //             const { latitude, longitude } = position.coords;
    //             try {
    //                 await axios.post('/start-day', {
    //                     job_id: selectedJobId,
    //                     latitude,
    //                     longitude
    //                 });
    //                 Inertia.visit('/dashboard');
    //             } catch (error) {
    //                 console.error('Error starting day:', error);
    //                 setError(error.response?.data?.errors?.location || 'Error starting day.');
    //             }
    //         }, (error) => {
    //             console.error('Geolocation error:', error);
    //             setError('Geolocation permission is required.');
    //         });
    //     } else {
    //         setError('Geolocation is not supported by this browser.');
    //     }
    // };

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Start Day</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <label className="block text-gray-700 mb-2">Select Job:</label>
            <select
                value={selectedJobId}
                onChange={handleJobSelection}
                className="p-2 border rounded w-full mb-4"
                required
            >
                {jobs.map(job => (
                    <option key={job.id} value={job.id}>{job.name}</option>
                ))}
            </select>
            <button onClick={handleStartDay} className="p-2 bg-blue-500 text-white rounded">
                Start Day
            </button>
        </div>
    );
};

export default StartDay;
