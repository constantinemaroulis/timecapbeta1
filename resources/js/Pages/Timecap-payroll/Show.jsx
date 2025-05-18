import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap payroll</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc payroll id:</strong> {item.tc_payroll_id}</p>
<p><strong>Tc emp id:</strong> {item.tc_emp_id}</p>
<p><strong>Tc payroll start date:</strong> {item.tc_payroll_start_date}</p>
<p><strong>Tc payroll end date:</strong> {item.tc_payroll_end_date}</p>
<p><strong>Tc total hours:</strong> {item.tc_total_hours}</p>
<p><strong>Tc hourly rate:</strong> {item.tc_hourly_rate}</p>
<p><strong>Tc gross pay:</strong> {item.tc_gross_pay}</p>
<p><strong>Tc tax withheld:</strong> {item.tc_tax_withheld}</p>
<p><strong>Tc net pay:</strong> {item.tc_net_pay}</p>
<p><strong>Tc payroll generated at:</strong> {item.tc_payroll_generated_at}</p>
        </div>
    );
}
