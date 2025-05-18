import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_job_id: '', tc_job_name: '', tc_job_address: '', tc_job_geocoordinates: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-locations');
    }

    return (
        <div>
            <h1>Create New Timecap locations</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc job id</label>
                    <input
                        value={data.tc_job_id}
                        onChange={e => setData('tc_job_id', e.target.value)}
                    />
                    {errors.tc_job_id && <div>{errors.tc_job_id}</div>}
                </div>
<div>
                    <label>Tc job name</label>
                    <input
                        value={data.tc_job_name}
                        onChange={e => setData('tc_job_name', e.target.value)}
                    />
                    {errors.tc_job_name && <div>{errors.tc_job_name}</div>}
                </div>
<div>
                    <label>Tc job address</label>
                    <input
                        value={data.tc_job_address}
                        onChange={e => setData('tc_job_address', e.target.value)}
                    />
                    {errors.tc_job_address && <div>{errors.tc_job_address}</div>}
                </div>
<div>
                    <label>Tc job geocoordinates</label>
                    <input
                        value={data.tc_job_geocoordinates}
                        onChange={e => setData('tc_job_geocoordinates', e.target.value)}
                    />
                    {errors.tc_job_geocoordinates && <div>{errors.tc_job_geocoordinates}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
