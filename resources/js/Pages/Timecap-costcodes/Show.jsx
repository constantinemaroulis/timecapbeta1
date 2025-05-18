import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap costcodes</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc costcode id:</strong> {item.tc_costcode_id}</p>
<p><strong>Tc job id:</strong> {item.tc_job_id}</p>
<p><strong>Tc costcode:</strong> {item.tc_costcode}</p>
<p><strong>Tc cost description:</strong> {item.tc_cost_description}</p>
<p><strong>Created at:</strong> {item.created_at}</p>
<p><strong>Updated at:</strong> {item.updated_at}</p>
        </div>
    );
}
