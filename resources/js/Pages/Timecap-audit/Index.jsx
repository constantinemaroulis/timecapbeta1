import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap audit</h1>
            <Link href="/timecap-audit/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc audit id</th>
<th>Tc user id</th>
<th>Tc action</th>
<th>Tc timestamp</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_audit_id}</td>
<td>{item.tc_user_id}</td>
<td>{item.tc_action}</td>
<td>{item.tc_timestamp}</td>
                            <td>
                                <Link href={`/timecap-audit/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-audit/${item.id}`}>
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
