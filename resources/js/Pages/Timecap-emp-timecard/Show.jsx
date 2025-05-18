import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap emp timecard</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc timecard id:</strong> {item.tc_timecard_id}</p>
<p><strong>Tc emp id:</strong> {item.tc_emp_id}</p>
<p><strong>Tc job id:</strong> {item.tc_job_id}</p>
<p><strong>Tc assignments id:</strong> {item.tc_assignments_id}</p>
<p><strong>Tc job costcodes:</strong> {item.tc_job_costcodes}</p>
<p><strong>Tc emp timecard note:</strong> {item.tc_emp_timecard_note}</p>
<p><strong>Tc emp timecard start:</strong> {item.tc_emp_timecard_start}</p>
<p><strong>Tc emp timecard end:</strong> {item.tc_emp_timecard_end}</p>
<p><strong>Tc emp timecard date:</strong> {item.tc_emp_timecard_date}</p>
<p><strong>Tc emp timecard total hours:</strong> {item.tc_emp_timecard_total_hours}</p>
<p><strong>Tc emp timecard start photo:</strong> {item.tc_emp_timecard_start_photo}</p>
<p><strong>Tc emp timecard end photo:</strong> {item.tc_emp_timecard_end_photo}</p>
<p><strong>Tc emp timecard start signature:</strong> {item.tc_emp_timecard_start_signature}</p>
<p><strong>Tc emp timecard end signature:</strong> {item.tc_emp_timecard_end_signature}</p>
<p><strong>Created at:</strong> {item.created_at}</p>
<p><strong>Updated at:</strong> {item.updated_at}</p>
        </div>
    );
}
