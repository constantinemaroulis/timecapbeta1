import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap job costs</h1>
            <Link href="/timecap-job-costs/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc cost id</th>
<th>Tc job id</th>
<th>Tc costcode id</th>
<th>Tc cost description</th>
<th>Tc cost hours</th>
<th>Tc cost amount</th>
<th>Tc cost date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_cost_id}</td>
<td>{item.tc_job_id}</td>
<td>{item.tc_costcode_id}</td>
<td>{item.tc_cost_description}</td>
<td>{item.tc_cost_hours}</td>
<td>{item.tc_cost_amount}</td>
<td>{item.tc_cost_date}</td>
                            <td>
                                <Link href={`/timecap-job-costs/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-job-costs/${item.id}`}>
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
