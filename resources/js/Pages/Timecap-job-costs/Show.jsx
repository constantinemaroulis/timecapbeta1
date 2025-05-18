import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap job costs</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc cost id:</strong> {item.tc_cost_id}</p>
<p><strong>Tc job id:</strong> {item.tc_job_id}</p>
<p><strong>Tc costcode id:</strong> {item.tc_costcode_id}</p>
<p><strong>Tc cost description:</strong> {item.tc_cost_description}</p>
<p><strong>Tc cost hours:</strong> {item.tc_cost_hours}</p>
<p><strong>Tc cost amount:</strong> {item.tc_cost_amount}</p>
<p><strong>Tc cost date:</strong> {item.tc_cost_date}</p>
        </div>
    );
}
