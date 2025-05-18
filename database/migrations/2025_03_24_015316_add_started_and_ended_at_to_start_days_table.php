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
    Schema::table('start_days', function (Blueprint $table) {
        $table->timestamp('started_at')->nullable();
        $table->timestamp('ended_at')->nullable();
    });
}

public function down(): void
{
    Schema::table('start_days', function (Blueprint $table) {
        $table->dropColumn(['started_at', 'ended_at']);
    });
}

};
