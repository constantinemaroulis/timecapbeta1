import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";

export default function NotificationPanel() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: "socket.io",
            host: `${window.location.hostname}:6001`,
        });

        echo.private(`employee.${window.employeeId}`)
            .listen("PhotoUploadEvent", (e) => {
                setNotifications((prev) => [
                    ...prev,
                    `Photo uploaded: ${e.photo_path}`,
                ]);
            });

        return () => echo.disconnect();
    }, []);

    return (
        <div className="notification-panel">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
}
