import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap emp</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc emp id:</strong> {item.tc_emp_id}</p>
<p><strong>Erp emp id:</strong> {item.erp_emp_id}</p>
<p><strong>Tc emp ssn6:</strong> {item.tc_emp_ssn6}</p>
<p><strong>Tc emp local:</strong> {item.tc_emp_local}</p>
<p><strong>Tc emp union:</strong> {item.tc_emp_union}</p>
<p><strong>Tc emp classification:</strong> {item.tc_emp_classification}</p>
<p><strong>Tc emp portal registered:</strong> {item.tc_emp_portal_registered}</p>
<p><strong>Tc emp registered time:</strong> {item.tc_emp_registered_time}</p>
<p><strong>Tc emp updated:</strong> {item.tc_emp_updated}</p>
<p><strong>Tc emp email:</strong> {item.tc_emp_email}</p>
<p><strong>Tc emp portal activate:</strong> {item.tc_emp_portal_activate}</p>
<p><strong>Tc emp hourly rate:</strong> {item.tc_emp_hourly_rate}</p>
<p><strong>Tc emp tax exemption:</strong> {item.tc_emp_tax_exemption}</p>
<p><strong>Created at:</strong> {item.created_at}</p>
<p><strong>Updated at:</strong> {item.updated_at}</p>
        </div>
    );
}
