import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap locations</h1>
            <Link href="/timecap-locations/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc job id</th>
<th>Tc job name</th>
<th>Tc job address</th>
<th>Tc job geocoordinates</th>
<th>Created at</th>
<th>Updated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_job_id}</td>
<td>{item.tc_job_name}</td>
<td>{item.tc_job_address}</td>
<td>{item.tc_job_geocoordinates}</td>
<td>{item.created_at}</td>
<td>{item.updated_at}</td>
                            <td>
                                <Link href={`/timecap-locations/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-locations/${item.id}`}>
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
