<?php
// app/Models/UserSession.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSession extends Model
{
    protected $fillable = [
        'session_id',
        'user_id',
        'clock_in_time',
        'clock_out_time',
        'photo_path',
        'signature_path',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
