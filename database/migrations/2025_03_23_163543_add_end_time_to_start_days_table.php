<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('start_days', function (Blueprint $table) {
            $table->timestamp('end_time')->nullable()->after('start_time');
        });
    }

    public function down(): void
    {
        Schema::table('start_days', function (Blueprint $table) {
            $table->dropColumn('end_time');
        });
    }
};

