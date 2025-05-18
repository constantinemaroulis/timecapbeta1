<?php

namespace App\Imports;

use App\Models\TimecapEmpDetail;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class TimecapEmpDetailImport implements ToModel, WithHeadingRow
{
    protected $importedEmpData;

    public function __construct($importedEmpData)
    {
        $this->importedEmpData = $importedEmpData;
    }

    public function model(array $row)
    {
        // Find the corresponding tc_emp_id from the imported data
        $empData = collect($this->importedEmpData)->firstWhere('erp_emp_id', $row['erp_emp_id']);

        return new TimecapEmpDetail([
            'tc_emp_id' => $empData['tc_emp_id'],
            'tc_emp_detail_first_name' => $row['tc_emp_detail_first_name'],
            'tc_emp_detail_last_name' => $row['tc_emp_detail_last_name'],
            'tc_emp_detail_address1' => $row['tc_emp_detail_address1'],
            'tc_emp_detail_address2' => $row['tc_emp_detail_address2'] ?: null, // Allow null
            'tc_emp_detail_address3' => $row['tc_emp_detail_address3'] ?: null, // Allow null
            'tc_emp_detail_city' => $row['tc_emp_detail_city'],
            'tc_emp_detail_state' => $row['tc_emp_detail_state'],
            'tc_emp_detail_zip' => $row['tc_emp_detail_zip'],
            'tc_emp_detail_dob' => $this->convertExcelDate($row['tc_emp_detail_dob']),
            'tc_emp_detail_hired' => $this->convertExcelDate($row['tc_emp_detail_hired']),
            'tc_emp_detail_last_worked' => $this->convertExcelDate($row['tc_emp_detail_last_worked']),
            'tc_emp_detail_phone' => $row['tc_emp_detail_phone'] ?: null, // Allow null
        ]);
    }

    private function convertExcelDate($value)
    {
        if (is_numeric($value)) {
            return ExcelDate::excelToDateTimeObject($value)->format('Y-m-d');
        } else {
            return $value;
        }
    }
}

