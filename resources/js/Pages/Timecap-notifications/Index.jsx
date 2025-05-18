import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap notifications</h1>
            <Link href="/timecap-notifications/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc notification id</th>
<th>Tc user id</th>
<th>Tc message</th>
<th>Tc type</th>
<th>Tc read</th>
<th>Tc created at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_notification_id}</td>
<td>{item.tc_user_id}</td>
<td>{item.tc_message}</td>
<td>{item.tc_type}</td>
<td>{item.tc_read}</td>
<td>{item.tc_created_at}</td>
                            <td>
                                <Link href={`/timecap-notifications/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-notifications/${item.id}`}>
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
