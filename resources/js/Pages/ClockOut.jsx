/*
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ClockOut() {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        clock_out_time: new Date().toISOString(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/api/clock-out');
    };

    return (
        <div>
            <h1>Clock Out</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        value={data.employee_id}
                        onChange={(e) => setData('employee_id', e.target.value)}
                    />
                    {errors.employee_id && <div>{errors.employee_id}</div>}
                </div>
                <button type="submit" disabled={processing}>Clock Out</button>
            </form>
        </div>
    );
}*/
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const ClockOut = ({ session, deviceUuid }) => {
    const [ssn, setSsn] = useState('');
    const [error, setError] = useState('');

    const handleClockOut = () => {
        Inertia.post('/usersessions/clockout', { session_id: session.id, ssn, device_uuid: deviceUuid }, {
            onError: (errors) => {
                setError(errors.error || 'Clock out failed.');
            }
        });
    };

    return (
        <div>
            <h2>Clock Out</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="password" placeholder="SSN" value={ssn} onChange={(e) => setSsn(e.target.value)} />
            <button onClick={handleClockOut}>Clock Out</button>
        </div>
    );
};

export default ClockOut;
