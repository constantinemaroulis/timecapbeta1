<?php

// app/Models/Device.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',         // Device name or identifier
        'uuid',         // Universally Unique Identifier
        'location',     // Physical or network location
        'status',       // e.g., 'active', 'inactive', 'maintenance', 'needs_attention'
        'day_started',  // Date the device was first registered or started a job
        'last_active',  // Timestamp of the last activity or check-in
        'job_id',       // Foreign key for the job this device is assigned to
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_active' => 'datetime',
        'day_started' => 'date',
    ];

    /**
     * Get the job associated with the device.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    /**
     * Get the sessions for the device.
     */
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}
