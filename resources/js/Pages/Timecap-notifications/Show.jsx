import React from 'react';

export default function Show({ item }) {
    return (
        <div>
            <h1>Details of Timecap notifications</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Tc notification id:</strong> {item.tc_notification_id}</p>
<p><strong>Tc user id:</strong> {item.tc_user_id}</p>
<p><strong>Tc message:</strong> {item.tc_message}</p>
<p><strong>Tc type:</strong> {item.tc_type}</p>
<p><strong>Tc read:</strong> {item.tc_read}</p>
<p><strong>Tc created at:</strong> {item.tc_created_at}</p>
        </div>
    );
}
