<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model {
    protected $table = 'job';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'description',
        'latitude',
        'longitude'
    ];

    public function startDays(): HasMany {
        return $this->hasMany(StartDay::class);
    }

    public function devices(): HasMany {
        return $this->hasMany(Device::class, 'id');
    }

    public function timecards(): HasMany {
        return $this->hasMany(Timecards::class, 'id');
    }
}
