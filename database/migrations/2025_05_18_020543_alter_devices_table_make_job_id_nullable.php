<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('devices', function (Blueprint $table) {
            // Ensure the column type matches your original definition (e.g., foreignId, unsignedBigInteger)
            // The important part is adding ->nullable()
            $table->foreignId('job_id')->nullable()->change();
            // If you didn't use foreignId initially, it might be:
            // $table->unsignedBigInteger('job_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('devices', function (Blueprint $table) {
            // Be cautious with the down method if you have existing data that relies on job_id being nullable.
            // This attempts to revert it to NOT NULL.
            $table->foreignId('job_id')->nullable(false)->change();
            // Or:
            // $table->unsignedBigInteger('job_id')->nullable(false)->change();
        });
    }
};
