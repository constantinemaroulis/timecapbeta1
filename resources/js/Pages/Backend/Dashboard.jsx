import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [settings, setSettings] = useState([]);
    const [jobId, setJobId] = useState('');
    const [type, setType] = useState('');
    const [rule, setRule] = useState('');
    const [adjustmentTime, setAdjustmentTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch settings from the server
        axios.get('/settings')
            .then(response => {
                setSettings(response.data);
            })
            .catch(error => {
                console.error('Error fetching settings:', error);
                setError('Error fetching settings.');
            });
    }, []);

    const handleJobSelection = (e) => {
        const selectedJobId = e.target.value;
    
        // Validate Geolocation before proceeding
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    await axios.post('/start-day', {
                        job_id: selectedJobId,
                        latitude,
                        longitude
                    });
                    Inertia.visit('/dashboard');
                } catch (error) {
                    console.error("Error starting day:", error);
                    setError(error.response?.data?.errors?.location || 'Error starting day.');
                }
            }, (error) => {
                console.error("Geolocation error:", error);
                setError('Geolocation permission is required.');
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        axios.post('/settings', {
            job_id: jobId,
            type,
            rule,
            adjustment_time: adjustmentTime,
        })
        .then(response => {
            setSettings([...settings, response.data]);
            setSuccess('Setting created successfully.');
            // Clear the form
            setJobId('');
            setType('');
            setRule('');
            setAdjustmentTime('');
        })
        .catch(error => {
            console.error('Error creating setting:', error);
            setError('Error creating setting.');
        });
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Job ID (optional)</label>
                    <input
                        type="text"
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter Job ID"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    >
                        <option value="" disabled>Select type</option>
                        <option value="clock_in">Clock In</option>
                        <option value="clock_out">Clock Out</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rule</label>
                    <input
                        type="text"
                        value={rule}
                        onChange={(e) => setRule(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter Rule"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Adjustment Time (optional, format: HH:mm:ss)</label>
                    <input
                        type="text"
                        value={adjustmentTime}
                        onChange={(e) => setAdjustmentTime(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter Adjustment Time"
                    />
                </div>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Setting</button>
            </form>
            <h2 className="text-xl font-bold mb-4">Existing Settings</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Job ID</th>
                        <th className="py-2 px-4 border-b">Type</th>
                        <th className="py-2 px-4 border-b">Rule</th>
                        <th className="py-2 px-4 border-b">Adjustment Time</th>
                    </tr>
                </thead>
                <tbody>
                    {settings.map((setting, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{setting.job_id}</td>
                            <td className="py-2 px-4 border-b">{setting.type}</td>
                            <td className="py-2 px-4 border-b">{setting.rule}</td>
                            <td className="py-2 px-4 border-b">{setting.adjustment_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
