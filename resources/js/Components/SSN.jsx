import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SSN = () => {
    const [ssn] = useState("");

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const response = await axios.get('/clock');
                const serverTimeStr = response.data.time;
                console.log("Server response:", response);

                // Expecting something like "14:05:30" or "14:05"
                const parts = serverTimeStr.split(':');

                // We need at least hour and minute
                if (parts.length < 2) {
                    console.error("Unexpected time format from server:", serverTimeStr);
                    return;
                }

                const hour = parseInt(parts[0], 10);
                const minute = parseInt(parts[1], 10);

                // Set the current date's time to the server's hour & minute
                const now = new Date();
                now.setHours(hour);
                now.setMinutes(minute);
                now.setSeconds(0);

                // Format the time in America/New_York, no seconds, 12-hour format
                const formatter = new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/New_York',
                    hour12: true
                });

                const formattedTime = formatter.format(now);
                setTime(formattedTime);
                console.log(formattedTime);
            } catch (error) {
                console.error("Error fetching time:", error);
            }
        };

        fetchTime();
        const interval = setInterval(fetchTime, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 bg-gray-200 rounded-md shadow-md text-center">
            <h1 className="text-2xl font-bold">Enter The Last </h1>
            <p className="text-xl mt-2" value="{time}">{time}</p>
        </div>
    );
};

export default Clock;
