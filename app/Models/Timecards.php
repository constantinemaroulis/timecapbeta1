<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timecards extends Model
{

    protected $table = 'timecap_timecards';
    protected $primaryKey = 'id';

    protected $fillable = [
        'start_day_id',
        'timecard_id',
        'job_id',
        'timecard_start_time',
        'timecard_end_time',
        'user_id',
        'status',
    ];

    protected $casts = [
        'timecard_start_time' => 'datetime',
        'timecard_end_time' => 'datetime',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class, 'job_id', 'id');
    }


}
