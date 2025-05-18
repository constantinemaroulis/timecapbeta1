import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { items } = usePage().props;

    return (
        <div>
            <h1>Manage Timecap users</h1>
            <Link href="/timecap-users/create">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Tc user id</th>
<th>Tc user name</th>
<th>Tc user email</th>
<th>Tc user password</th>
<th>Tc user role</th>
<th>Created at</th>
<th>Updated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.tc_user_id}</td>
<td>{item.tc_user_name}</td>
<td>{item.tc_user_email}</td>
<td>{item.tc_user_password}</td>
<td>{item.tc_user_role}</td>
<td>{item.created_at}</td>
<td>{item.updated_at}</td>
                            <td>
                                <Link href={`/timecap-users/${item.id}/edit`}>Edit</Link>
                                <form method="POST" action={`/timecap-users/${item.id}`}>
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
