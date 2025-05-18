<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Timecards PDF Export</title>
    <style>
        /* Styles for the PDF */
        body {
            font-family: sans-serif;
            font-size: 12px;
        }
        h1 {
            text-align: center;
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        .signature {
            width: 100px;
            height: 50px;
        }
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <h1>Timecards Report</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>SSN</th>
                <th>Time In</th>
                <th>Signature</th>
                <th>Time Out</th>
                <th>Signature</th>
            </tr>
        </thead>
        <tbody>
            @foreach($timecards as $timecard)
                <tr>
                    <td>
                        {{ $timecard->details->tc_emp_detail_first_name ?? 'N/A' }}
                        {{ $timecard->details->tc_emp_detail_last_name ?? '' }}
                    </td>
                    <td>
                        @php
                            $ssn6 = $timecard->employee->tc_emp_ssn6 ?? '000000';
                            $formattedSSN = '***-**-' . substr($ssn6, -4);
                        @endphp
                        {{ $formattedSSN }}
                    </td>
                    <td>
                        @if($timecard->tc_timecard_start)
                            {{ $timecard->tc_timecard_start }}
                        @else
                            Error
                        @endif
                    </td>
                    <td>
                        @if($timecard->tc_emp_timecard_start_signature)
                            <img src="{{ public_path('uploads/' . $timecard->tc_emp_timecard_start_signature) }}" style="width:100%" class="signature" alt="Signature">
                        @else
                            No Signature
                        @endif
                    </td>
                    <td>
                        @if($timecard->tc_timecard_end)
                            {{ $timecard->tc_timecard_end }}
                        @else
                            Error
                        @endif
                    </td>
                    <td>
                        @if($timecard->tc_emp_timecard_end_signature)
                            <img src="{{ public_path('uploads/' . $timecard->tc_emp_timecard_end_signature) }}" style="width:100%" class="signature" alt="Signature">
                        @else
                            No Signature
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
