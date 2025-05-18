<?php

namespace App\Imports;

use App\Models\TimecapEmp;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class TimecapEmpImport implements ToModel, WithHeadingRow
{
    public $importedIds = [];

    public function model(array $row)
    {
        $timecapEmp = TimecapEmp::create([
            'erp_emp_id' => trim($row['erp_emp_id']),
            'tc_emp_ssn6' => $row['tc_emp_ssn6'],
            'tc_emp_local_id' => $row['tc_emp_local_id'],
            'tc_emp_union_id' => $row['tc_emp_union_id'],
            'tc_emp_classification' => $row['tc_emp_classification'],
            'tc_emp_portal_registered' => $row['tc_emp_portal_registered'],
            'tc_emp_registered_time' => $this->convertExcelDateTime($row['tc_emp_registered_time']),
            'tc_emp_updated' => $this->convertExcelDateTime($row['tc_emp_updated']),
            'tc_emp_email' => $row['tc_emp_email'] ?: null, // Allow null
            'tc_emp_portal_activate' => $row['tc_emp_portal_activate'],
            'tc_emp_portal_activate_temp' => $row['tc_emp_portal_activate_temp'],
        ]);

        // Store the imported ID and corresponding row data
        $this->importedIds[] = ['tc_emp_id' => $timecapEmp->tc_emp_id] + $row;
    }

    private function convertExcelDateTime($value)
    {
        if (is_numeric($value)) {
            return ExcelDate::excelToDateTimeObject($value)->format('Y-m-d H:i:s');
        } else {
            return $value;
        }
    }
}

