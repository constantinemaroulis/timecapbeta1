<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class TimecapEmp extends Model
{
    use HasFactory;

    protected $table = 'timecap_emp';
    protected $primaryKey = 'tc_emp_id';

    protected $fillable = [
        'erp_emp_id',
        'tc_emp_ssn6',
        'tc_emp_local_id',
        'tc_emp_union_id',
        'tc_emp_classification',
        'tc_emp_portal_registered',
        'tc_emp_registered_time',
        'tc_emp_updated',
        'tc_emp_email',
        'tc_emp_portal_activate',
        'tc_emp_portal_activate_temp',
    ];

    public function local()
    {
        return $this->belongsTo(TimecapLocal::class, 'tc_emp_local_id', 'tc_local_id');
    }



    public function details()
    {
        return $this->hasOne(TimecapEmpDetail::class, 'tc_emp_id', 'tc_emp_id');
    }

    public function timecards()
    {
        return $this->hasMany(TimecapEmpTimecard::class, 'tc_emp_id', 'tc_emp_id');
    }

    public function employee()
    {
        return $this->belongsTo(TimecapEmp::class, 'tc_emp_id', 'tc_emp_id');
    }



}
