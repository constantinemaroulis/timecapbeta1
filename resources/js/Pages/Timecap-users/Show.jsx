import React from 'react';

export default function Show({ item }) {
    return (
        <>
        <div>
            <h1>Details of Timecap users</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc user id:</strong> {item.tc_user_id}</p>
<p><strong>Tc user name:</strong> {item.tc_user_name}</p>
<p><strong>Tc user email:</strong> {item.tc_user_email}</p>
<p><strong>Tc user password:</strong> {item.tc_user_password}</p>
<p><strong>Tc user role:</strong> {item.tc_user_role}</p>
<p><strong>Created at:</strong> {item.created_at}</p>
<p><strong>Updated at:</strong> {item.updated_at}</p>
        </div>
        </>
    );
}
