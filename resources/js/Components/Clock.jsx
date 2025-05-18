import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const response = await axios.get('/clock');
                const serverTimeStr = response.data.time;

                const parts = serverTimeStr.split(':');
                if (parts.length < 2) {
                    console.error("Unexpected time format from server:", serverTimeStr);
                    return;
                }

                const hour = parseInt(parts[0], 10);
                const minute = parseInt(parts[1], 10);

                const now = new Date();
                now.setHours(hour);
                now.setMinutes(minute);
                now.setSeconds(0);

                const formatter = new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/New_York',
                    hour12: true
                });

                setTime(formatter.format(now));
            } catch (error) {
                console.error("Error fetching time:", error);
            }
        };

        fetchTime();
        const interval = setInterval(fetchTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 bg-gray-200 rounded-md shadow-md text-center">
            <h1 className="text-2xl font-bold">Clock In</h1>
            <p className="text-xl mt-2">{time}</p>
        </div>
    );
};

export default Clock;
