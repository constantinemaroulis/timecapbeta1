import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_audit_id: '', tc_user_id: '', tc_action: '', tc_timestamp: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-audit');
    }

    return (
        <div>
            <h1>Create New Timecap audit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc audit id</label>
                    <input
                        value={data.tc_audit_id}
                        onChange={e => setData('tc_audit_id', e.target.value)}
                    />
                    {errors.tc_audit_id && <div>{errors.tc_audit_id}</div>}
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
                    <label>Tc action</label>
                    <input
                        value={data.tc_action}
                        onChange={e => setData('tc_action', e.target.value)}
                    />
                    {errors.tc_action && <div>{errors.tc_action}</div>}
                </div>
<div>
                    <label>Tc timestamp</label>
                    <input
                        value={data.tc_timestamp}
                        onChange={e => setData('tc_timestamp', e.target.value)}
                    />
                    {errors.tc_timestamp && <div>{errors.tc_timestamp}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
