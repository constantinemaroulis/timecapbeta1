<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('timecap_emp_timecard', function (Blueprint $table) {
            $table->unsignedBigInteger('job_id')->nullable();

            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('timecap_emp_timecard', function (Blueprint $table) {
            $table->dropForeign(['job_id']);
            $table->dropColumn('job_id');
        });
    }
};

