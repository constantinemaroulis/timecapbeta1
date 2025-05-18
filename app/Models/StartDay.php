<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StartDay extends Model {

    protected $table = 'start_days';
    protected $primaryKey = 'id';

    protected $fillable = ['user_id', 'job_id', 'started_at', 'ended_at'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function job(): BelongsTo {
        return $this->belongsTo(Job::class);
    }

    public function timecards(): HasMany {
        return $this->hasMany(TimecapEmpTimecard::class, 'start_day_id');
    }
}
