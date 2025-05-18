<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimecapTimecards extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('timecap_timecards', function (Blueprint $table) {
            $table->id(); // Primary key 'id'
            $table->bigInteger('timecard_id')->unsigned()->unique(); // 15-digit sequence number
            $table->foreignId('job_id')->constrained('jobs'); // Foreign key from 'jobs' table
            $table->timestamp('timecard_start_time')->nullable(); // Auto-assigned start time
            $table->timestamp('timecard_end_time')->nullable(); // Auto-assigned end time
            $table->date('timecard_start_date')->nullable(); // Start date
            $table->date('timecard_end_date')->nullable(); // End date
            $table->foreignId('user_id')->constrained('users'); // Foreign key from 'users' table
            $table->enum('status', ['open', 'closed', 'pending'])->default('open'); // Status field
            $table->timestamps(); // Created at and updated at

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timecap_timecards');
    }
};
