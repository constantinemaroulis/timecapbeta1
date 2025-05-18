<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimecapEmpTimecard extends Model
{
    use HasFactory;

    protected $table = 'timecap_emp_timecard';
    protected $primaryKey = 'tc_timecard_id';

    protected $fillable = [
        'tc_emp_id',
        'tc_job_costcodes',
        'tc_timecard_start',
        'tc_timecard_end',
        'tc_adjusted_timecard_start',
        'tc_adjusted_timecard_end',
        'tc_emp_timecard_start_photo',
        'tc_emp_timecard_end_photo',
        'tc_emp_timecard_start_signature',
        'tc_emp_timecard_end_signature',
        'tc_timecard_submitted',
        'tc_timecard_approved',
        'tc_timecard_status',
    ];

    protected $casts = [
        'tc_job_costcodes' => 'array',
        'tc_timecard_start' => 'datetime',
        'tc_timecard_end' => 'datetime',
        'tc_adjusted_timecard_start' => 'datetime',
        'tc_adjusted_timecard_end' => 'datetime',
    ];

    /**
     * Main employee relation.
     */
    public function employee()
    {
        return $this->belongsTo(TimecapEmpDetail::class, 'tc_emp_id', 'tc_emp_id');
    }


    /*
     public function details()
    {
        return $this->hasOne(TimecapEmpDetail::class, 'tc_emp_id', 'tc_emp_id');
    }
    **/


}
