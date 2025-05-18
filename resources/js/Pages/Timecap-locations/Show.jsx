import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap locations</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc job id:</strong> {item.tc_job_id}</p>
<p><strong>Tc job name:</strong> {item.tc_job_name}</p>
<p><strong>Tc job address:</strong> {item.tc_job_address}</p>
<p><strong>Tc job geocoordinates:</strong> {item.tc_job_geocoordinates}</p>
<p><strong>Created at:</strong> {item.created_at}</p>
<p><strong>Updated at:</strong> {item.updated_at}</p>
        </div>
    );
}
