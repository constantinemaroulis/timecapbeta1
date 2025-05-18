import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap assignments</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc assignments id:</strong> {item.tc_assignments_id}</p>
<p><strong>Tc user id:</strong> {item.tc_user_id}</p>
<p><strong>Tc job id:</strong> {item.tc_job_id}</p>
<p><strong>Tc timecard id:</strong> {item.tc_timecard_id}</p>
<p><strong>Tc assignment status:</strong> {item.tc_assignment_status}</p>
<p><strong>Tc assignment type:</strong> {item.tc_assignment_type}</p>
<p><strong>Tc assignment shift number:</strong> {item.tc_assignment_shift_number}</p>
<p><strong>Tc assignment start timestamp:</strong> {item.tc_assignment_start_timestamp}</p>
<p><strong>Tc assignment end timestamp:</strong> {item.tc_assignment_end_timestamp}</p>
<p><strong>Tc assignment date:</strong> {item.tc_assignment_date}</p>
<p><strong>Created at:</strong> {item.created_at}</p>
<p><strong>Updated at:</strong> {item.updated_at}</p>
        </div>
    );
}
