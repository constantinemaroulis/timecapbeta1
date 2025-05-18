import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap dsol</h1>
            <Link href="/timecap-dsol/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc dsol id</th>
<th>Tc assignment id</th>
<th>Tc timecards</th>
<th>Created at</th>
<th>Updated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_dsol_id}</td>
<td>{item.tc_assignment_id}</td>
<td>{item.tc_timecards}</td>
<td>{item.created_at}</td>
<td>{item.updated_at}</td>
                            <td>
                                <Link href={`/timecap-dsol/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-dsol/${item.id}`}>
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
