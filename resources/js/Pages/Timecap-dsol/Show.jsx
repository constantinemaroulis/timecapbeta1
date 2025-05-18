import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap dsol</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc dsol id:</strong> {item.tc_dsol_id}</p>
<p><strong>Tc assignment id:</strong> {item.tc_assignment_id}</p>
<p><strong>Tc timecards:</strong> {item.tc_timecards}</p>
<p><strong>Created at:</strong> {item.created_at}</p>
<p><strong>Updated at:</strong> {item.updated_at}</p>
        </div>
    );
}
