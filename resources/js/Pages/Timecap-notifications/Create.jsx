import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_notification_id: '', tc_user_id: '', tc_message: '', tc_type: '', tc_read: '', tc_created_at: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-notifications');
    }

    return (
        <div>
            <h1>Create New Timecap notifications</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc notification id</label>
                    <input
                        value={data.tc_notification_id}
                        onChange={e => setData('tc_notification_id', e.target.value)}
                    />
                    {errors.tc_notification_id && <div>{errors.tc_notification_id}</div>}
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
                    <label>Tc message</label>
                    <input
                        value={data.tc_message}
                        onChange={e => setData('tc_message', e.target.value)}
                    />
                    {errors.tc_message && <div>{errors.tc_message}</div>}
                </div>
<div>
                    <label>Tc type</label>
                    <input
                        value={data.tc_type}
                        onChange={e => setData('tc_type', e.target.value)}
                    />
                    {errors.tc_type && <div>{errors.tc_type}</div>}
                </div>
<div>
                    <label>Tc read</label>
                    <input
                        value={data.tc_read}
                        onChange={e => setData('tc_read', e.target.value)}
                    />
                    {errors.tc_read && <div>{errors.tc_read}</div>}
                </div>
<div>
                    <label>Tc created at</label>
                    <input
                        value={data.tc_created_at}
                        onChange={e => setData('tc_created_at', e.target.value)}
                    />
                    {errors.tc_created_at && <div>{errors.tc_created_at}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
