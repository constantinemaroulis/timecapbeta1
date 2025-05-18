<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimecapLocal extends Model
{
    use HasFactory;

    protected $table = 'timecap_local';
    protected $primaryKey = 'tc_local_id';
    protected $fillable = [
        'tc_local_name',
        'tc_local_description',
    ];

    public function employees()
    {
        return $this->hasMany(TimecapEmp::class, 'tc_emp_local_id', 'tc_local_id');
    }
}
