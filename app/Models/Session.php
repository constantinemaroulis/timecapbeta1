<?php
// app/Models/Session.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $fillable = [
        'device_id',
        'date',
        'start_time',
        'end_time',
        'status',
        'cost_coding_fulfilled',
        'expenses_allocated',
        'previous_day_closed',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function userSessions()
    {
        return $this->hasMany(UserSession::class);
    }


}
