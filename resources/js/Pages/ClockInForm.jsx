import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';

const ClockInForm = () => {
    const { data, setData, post, errors } = useForm({
        tc_emp_ssn6: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post('/validate-ssn', {
                tc_emp_ssn6: ssn6,
            });

            if (res.data.valid) {
                // ✅ Save job_id from response or fallback

                // ✅ Redirect to /clock-in
                window.location.href = '/clock-in';
            } else {
                setError('Invalid SSN');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Validation failed.');
        }
    };

    return (
        <div className="p-4 bg-gray-200 rounded-md shadow-md text-center">
            <h1 className="text-2xl font-bold">Enter SSN</h1>
            {errors.tc_emp_ssn6 && <div>{errors.tc_emp_ssn6}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="tc_emp_ssn6"
                    value={data.tc_emp_ssn6}
                    onChange={(e) => setData('tc_emp_ssn6', e.target.value)}
                    className="mt-2 p-2 border rounded"
                    maxLength="6"
                    required
                />
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
        </div>
    );
};

export default ClockInForm;
