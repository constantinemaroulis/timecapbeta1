import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap emp</h1>
            <Link href="/timecap-emp/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc emp id</th>
<th>Erp emp id</th>
<th>Tc emp ssn6</th>
<th>Tc emp local</th>
<th>Tc emp union</th>
<th>Tc emp classification</th>
<th>Tc emp portal registered</th>
<th>Tc emp registered time</th>
<th>Tc emp updated</th>
<th>Tc emp email</th>
<th>Tc emp portal activate</th>
<th>Tc emp hourly rate</th>
<th>Tc emp tax exemption</th>
<th>Created at</th>
<th>Updated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_emp_id}</td>
<td>{item.erp_emp_id}</td>
<td>{item.tc_emp_ssn6}</td>
<td>{item.tc_emp_local}</td>
<td>{item.tc_emp_union}</td>
<td>{item.tc_emp_classification}</td>
<td>{item.tc_emp_portal_registered}</td>
<td>{item.tc_emp_registered_time}</td>
<td>{item.tc_emp_updated}</td>
<td>{item.tc_emp_email}</td>
<td>{item.tc_emp_portal_activate}</td>
<td>{item.tc_emp_hourly_rate}</td>
<td>{item.tc_emp_tax_exemption}</td>
<td>{item.created_at}</td>
<td>{item.updated_at}</td>
                            <td>
                                <Link href={`/timecap-emp/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-emp/${item.id}`}>
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
