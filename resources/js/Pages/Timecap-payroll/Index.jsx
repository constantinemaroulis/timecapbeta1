import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap payroll</h1>
            <Link href="/timecap-payroll/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc payroll id</th>
<th>Tc emp id</th>
<th>Tc payroll start date</th>
<th>Tc payroll end date</th>
<th>Tc total hours</th>
<th>Tc hourly rate</th>
<th>Tc gross pay</th>
<th>Tc tax withheld</th>
<th>Tc net pay</th>
<th>Tc payroll generated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_payroll_id}</td>
<td>{item.tc_emp_id}</td>
<td>{item.tc_payroll_start_date}</td>
<td>{item.tc_payroll_end_date}</td>
<td>{item.tc_total_hours}</td>
<td>{item.tc_hourly_rate}</td>
<td>{item.tc_gross_pay}</td>
<td>{item.tc_tax_withheld}</td>
<td>{item.tc_net_pay}</td>
<td>{item.tc_payroll_generated_at}</td>
                            <td>
                                <Link href={`/timecap-payroll/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-payroll/${item.id}`}>
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <button type="submit">Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
