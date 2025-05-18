import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_dsol_id: '', tc_assignment_id: '', tc_timecards: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-dsol');
    }

    return (
        <div>
            <h1>Create New Timecap dsol</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc dsol id</label>
                    <input
                        value={data.tc_dsol_id}
                        onChange={e => setData('tc_dsol_id', e.target.value)}
                    />
                    {errors.tc_dsol_id && <div>{errors.tc_dsol_id}</div>}
                </div>
<div>
                    <label>Tc assignment id</label>
                    <input
                        value={data.tc_assignment_id}
                        onChange={e => setData('tc_assignment_id', e.target.value)}
                    />
                    {errors.tc_assignment_id && <div>{errors.tc_assignment_id}</div>}
                </div>
<div>
                    <label>Tc timecards</label>
                    <input
                        value={data.tc_timecards}
                        onChange={e => setData('tc_timecards', e.target.value)}
                    />
                    {errors.tc_timecards && <div>{errors.tc_timecards}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
