import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap emp timecard</h1>
            <Link href="/timecap-emp-timecard/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc timecard id</th>
<th>Tc emp id</th>
<th>Tc job id</th>
<th>Tc assignments id</th>
<th>Tc job costcodes</th>
<th>Tc emp timecard note</th>
<th>Tc emp timecard start</th>
<th>Tc emp timecard end</th>
<th>Tc emp timecard date</th>
<th>Tc emp timecard total hours</th>
<th>Tc emp timecard start photo</th>
<th>Tc emp timecard end photo</th>
<th>Tc emp timecard start signature</th>
<th>Tc emp timecard end signature</th>
<th>Created at</th>
<th>Updated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_timecard_id}</td>
<td>{item.tc_emp_id}</td>
<td>{item.tc_job_id}</td>
<td>{item.tc_assignments_id}</td>
<td>{item.tc_job_costcodes}</td>
<td>{item.tc_emp_timecard_note}</td>
<td>{item.tc_emp_timecard_start}</td>
<td>{item.tc_emp_timecard_end}</td>
<td>{item.tc_emp_timecard_date}</td>
<td>{item.tc_emp_timecard_total_hours}</td>
<td>{item.tc_emp_timecard_start_photo}</td>
<td>{item.tc_emp_timecard_end_photo}</td>
<td>{item.tc_emp_timecard_start_signature}</td>
<td>{item.tc_emp_timecard_end_signature}</td>
<td>{item.created_at}</td>
<td>{item.updated_at}</td>
                            <td>
                                <Link href={`/timecap-emp-timecard/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-emp-timecard/${item.id}`}>
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
