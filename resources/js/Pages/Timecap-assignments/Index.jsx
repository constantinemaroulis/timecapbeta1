import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap assignments</h1>
            <Link href="/timecap-assignments/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc assignments id</th>
<th>Tc user id</th>
<th>Tc job id</th>
<th>Tc timecard id</th>
<th>Tc assignment status</th>
<th>Tc assignment type</th>
<th>Tc assignment shift number</th>
<th>Tc assignment start timestamp</th>
<th>Tc assignment end timestamp</th>
<th>Tc assignment date</th>
<th>Created at</th>
<th>Updated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_assignments_id}</td>
<td>{item.tc_user_id}</td>
<td>{item.tc_job_id}</td>
<td>{item.tc_timecard_id}</td>
<td>{item.tc_assignment_status}</td>
<td>{item.tc_assignment_type}</td>
<td>{item.tc_assignment_shift_number}</td>
<td>{item.tc_assignment_start_timestamp}</td>
<td>{item.tc_assignment_end_timestamp}</td>
<td>{item.tc_assignment_date}</td>
<td>{item.created_at}</td>
<td>{item.updated_at}</td>
                            <td>
                                <Link href={`/timecap-assignments/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-assignments/${item.id}`}>
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
