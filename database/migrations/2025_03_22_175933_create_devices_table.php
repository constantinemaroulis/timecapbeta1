<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevicesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->uuid('uuid')->unique();
            $table->string('location')->nullable();
            $table->enum('status', ['idle', 'active', 'troubleshooting'])->default('idle');
            $table->boolean('day_started')->default(false);
            $table->timestamp('last_active')->nullable();
            $table->foreignId('job_id')->constrained()->onDelete('cascade'); // Connecting to jobs table
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('devices');
    }
}
