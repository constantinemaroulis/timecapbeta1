import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap audit</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc audit id:</strong> {item.tc_audit_id}</p>
<p><strong>Tc user id:</strong> {item.tc_user_id}</p>
<p><strong>Tc action:</strong> {item.tc_action}</p>
<p><strong>Tc timestamp:</strong> {item.tc_timestamp}</p>
        </div>
    );
}
