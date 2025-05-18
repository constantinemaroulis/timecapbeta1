import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_cost_id: '', tc_job_id: '', tc_costcode_id: '', tc_cost_description: '', tc_cost_hours: '', tc_cost_amount: '', tc_cost_date: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-job-costs');
    }

    return (
        <div>
            <h1>Create New Timecap job costs</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc cost id</label>
                    <input
                        value={data.tc_cost_id}
                        onChange={e => setData('tc_cost_id', e.target.value)}
                    />
                    {errors.tc_cost_id && <div>{errors.tc_cost_id}</div>}
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
                    <label>Tc costcode id</label>
                    <input
                        value={data.tc_costcode_id}
                        onChange={e => setData('tc_costcode_id', e.target.value)}
                    />
                    {errors.tc_costcode_id && <div>{errors.tc_costcode_id}</div>}
                </div>
<div>
                    <label>Tc cost description</label>
                    <input
                        value={data.tc_cost_description}
                        onChange={e => setData('tc_cost_description', e.target.value)}
                    />
                    {errors.tc_cost_description && <div>{errors.tc_cost_description}</div>}
                </div>
<div>
                    <label>Tc cost hours</label>
                    <input
                        value={data.tc_cost_hours}
                        onChange={e => setData('tc_cost_hours', e.target.value)}
                    />
                    {errors.tc_cost_hours && <div>{errors.tc_cost_hours}</div>}
                </div>
<div>
                    <label>Tc cost amount</label>
                    <input
                        value={data.tc_cost_amount}
                        onChange={e => setData('tc_cost_amount', e.target.value)}
                    />
                    {errors.tc_cost_amount && <div>{errors.tc_cost_amount}</div>}
                </div>
<div>
                    <label>Tc cost date</label>
                    <input
                        value={data.tc_cost_date}
                        onChange={e => setData('tc_cost_date', e.target.value)}
                    />
                    {errors.tc_cost_date && <div>{errors.tc_cost_date}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
