import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_costcode_id: '', tc_job_id: '', tc_costcode: '', tc_cost_description: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-costcodes');
    }

    return (
        <div>
            <h1>Create New Timecap costcodes</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc costcode id</label>
                    <input
                        value={data.tc_costcode_id}
                        onChange={e => setData('tc_costcode_id', e.target.value)}
                    />
                    {errors.tc_costcode_id && <div>{errors.tc_costcode_id}</div>}
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
                    <label>Tc costcode</label>
                    <input
                        value={data.tc_costcode}
                        onChange={e => setData('tc_costcode', e.target.value)}
                    />
                    {errors.tc_costcode && <div>{errors.tc_costcode}</div>}
                </div>
<div>
                    <label>Tc cost description</label>
                    <input
                        value={data.tc_cost_description}
                        onChange={e => setData('tc_cost_description', e.target.value)}
                    />
                    {errors.tc_cost_description && <div>{errors.tc_cost_description}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
