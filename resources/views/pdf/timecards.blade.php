<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Timecards PDF</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background-color: #f3f3f3; }
    </style>
</head>
<body>
    <h2>Timecards Report</h2>
    <table>
        <thead>
            <tr>
                <th>Employee</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($timecards as $tc)
                <tr>
                    <td>{{ $tc->employee->tc_emp_name ?? 'N/A' }}</td>
                    <td>{{ \Carbon\Carbon::parse($tc->tc_timecard_start)->format('M d, Y h:i A') }}</td>
                    <td>{{ $tc->tc_timecard_end ? \Carbon\Carbon::parse($tc->tc_timecard_end)->format('M d, Y h:i A') : '-' }}</td>
                    <td>{{ ucfirst($tc->tc_timecard_status) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
