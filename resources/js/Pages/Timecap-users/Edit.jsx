import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ item }) {
    const { data, setData, put, processing, errors } = useForm(item);

    function handleSubmit(e) {
        e.preventDefault();
        put(`/timecap-users/${item.id}`);
    }

    return (
        <div>
            <h1>Edit Timecap users</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc user id</label>
                    <input
                        value={data.tc_user_id}
                        onChange={e => setData('tc_user_id', e.target.value)}
                    />
                    {errors.tc_user_id && <div>{errors.tc_user_id}</div>}
                </div>
<div>
                    <label>Tc user name</label>
                    <input
                        value={data.tc_user_name}
                        onChange={e => setData('tc_user_name', e.target.value)}
                    />
                    {errors.tc_user_name && <div>{errors.tc_user_name}</div>}
                </div>
<div>
                    <label>Tc user email</label>
                    <input
                        value={data.tc_user_email}
                        onChange={e => setData('tc_user_email', e.target.value)}
                    />
                    {errors.tc_user_email && <div>{errors.tc_user_email}</div>}
                </div>
<div>
                    <label>Tc user password</label>
                    <input
                        value={data.tc_user_password}
                        onChange={e => setData('tc_user_password', e.target.value)}
                    />
                    {errors.tc_user_password && <div>{errors.tc_user_password}</div>}
                </div>
<div>
                    <label>Tc user role</label>
                    <input
                        value={data.tc_user_role}
                        onChange={e => setData('tc_user_role', e.target.value)}
                    />
                    {errors.tc_user_role && <div>{errors.tc_user_role}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
