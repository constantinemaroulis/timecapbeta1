<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_job_costs', function (Blueprint $table) {
            $table->id('tc_cost_id');
        });
    }
    public function down()
    {
        Schema::dropIfExists('timecap_job_costs');
    }
};