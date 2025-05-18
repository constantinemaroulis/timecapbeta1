<?php

namespace App\Http\Controllers;

use App\Models\TimecapEmpTimecard;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;


class PdfExportController extends Controller
{
    /**
     * Export timecards to PDF.
     */
    public function exportPdf()
    {
        try {
            // Fetch timecards with related employee data
            $timecards = TimecapEmpTimecard::with('employee')->get();

            // Load the Blade view and pass data
            $pdf = Pdf::loadView('timecards.pdf', compact('timecards'));

            // Optionally, set paper size and orientation
            $pdf->setPaper('A4', 'portrait');

            // Return the generated PDF as a download
            return $pdf->download('TimecardsReport.pdf');
        } catch (\Exception $e) {
            Log::error('Error exporting PDF: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while exporting the PDF.'], 500);
        }
    }

    public function exportByJobDate($jobId, $date)
    {
        $timecards = TimecapEmpTimecard::with(['employee'])
            ->whereDate('tc_timecard_start', $date)
            ->get();

        $pdf = Pdf::loadView('timecards.pdf', compact('timecards', 'date'));
        return $pdf->download("Timecards_{$jobId}_{$date}.pdf");
    }

}
