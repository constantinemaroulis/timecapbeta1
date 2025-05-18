import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_assignments_id: '', tc_user_id: '', tc_job_id: '', tc_timecard_id: '', tc_assignment_status: '', tc_assignment_type: '', tc_assignment_shift_number: '', tc_assignment_start_timestamp: '', tc_assignment_end_timestamp: '', tc_assignment_date: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-assignments');
    }

    return (
        <div>
            <h1>Create New Timecap assignments</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc assignments id</label>
                    <input
                        value={data.tc_assignments_id}
                        onChange={e => setData('tc_assignments_id', e.target.value)}
                    />
                    {errors.tc_assignments_id && <div>{errors.tc_assignments_id}</div>}
                </div>
<div>
                    <label>Tc user id</label>
                    <input
                        value={data.tc_user_id}
                        onChange={e => setData('tc_user_id', e.target.value)}
                    />
                    {errors.tc_user_id && <div>{errors.tc_user_id}</div>}
                </div>
<div>
                    <label>Tc job id</label>
                    <input
                        value={data.tc_job_id}
                        onChange={e => setData('tc_job_id', e.target.value)}
                    />
                    {errors.tc_job_id && <div>{errors.tc_job_id}</div>}
                </div>
<div>
                    <label>Tc timecard id</label>
                    <input
                        value={data.tc_timecard_id}
                        onChange={e => setData('tc_timecard_id', e.target.value)}
                    />
                    {errors.tc_timecard_id && <div>{errors.tc_timecard_id}</div>}
                </div>
<div>
                    <label>Tc assignment status</label>
                    <input
                        value={data.tc_assignment_status}
                        onChange={e => setData('tc_assignment_status', e.target.value)}
                    />
                    {errors.tc_assignment_status && <div>{errors.tc_assignment_status}</div>}
                </div>
<div>
                    <label>Tc assignment type</label>
                    <input
                        value={data.tc_assignment_type}
                        onChange={e => setData('tc_assignment_type', e.target.value)}
                    />
                    {errors.tc_assignment_type && <div>{errors.tc_assignment_type}</div>}
                </div>
<div>
                    <label>Tc assignment shift number</label>
                    <input
                        value={data.tc_assignment_shift_number}
                        onChange={e => setData('tc_assignment_shift_number', e.target.value)}
                    />
                    {errors.tc_assignment_shift_number && <div>{errors.tc_assignment_shift_number}</div>}
                </div>
<div>
                    <label>Tc assignment start timestamp</label>
                    <input
                        value={data.tc_assignment_start_timestamp}
                        onChange={e => setData('tc_assignment_start_timestamp', e.target.value)}
                    />
                    {errors.tc_assignment_start_timestamp && <div>{errors.tc_assignment_start_timestamp}</div>}
                </div>
<div>
                    <label>Tc assignment end timestamp</label>
                    <input
                        value={data.tc_assignment_end_timestamp}
                        onChange={e => setData('tc_assignment_end_timestamp', e.target.value)}
                    />
                    {errors.tc_assignment_end_timestamp && <div>{errors.tc_assignment_end_timestamp}</div>}
                </div>
<div>
                    <label>Tc assignment date</label>
                    <input
                        value={data.tc_assignment_date}
                        onChange={e => setData('tc_assignment_date', e.target.value)}
                    />
                    {errors.tc_assignment_date && <div>{errors.tc_assignment_date}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
