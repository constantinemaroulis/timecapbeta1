<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimecapEmpDetail extends Model
{
    use HasFactory;

    protected $table = 'timecap_emp_details';

    protected $fillable = [
        'tc_emp_id',
        'tc_emp_detail_first_name',
        'tc_emp_detail_last_name',
        'tc_emp_detail_address1',
        'tc_emp_detail_address2',
        'tc_emp_detail_address3',
        'tc_emp_detail_city',
        'tc_emp_detail_state',
        'tc_emp_detail_zip',
        'tc_emp_detail_dob',
        'tc_emp_detail_hired',
        'tc_emp_detail_last_worked',
        'tc_emp_detail_phone',
    ];

    public function details()
    {
        return $this->belongsTo(TimecapEmpDetail::class, 'tc_emp_id', 'tc_emp_id');
    }
}
