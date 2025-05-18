<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_locations', function (Blueprint $table) {
            $table->id('tc_job_id');
            $table->string('tc_job_name');
            $table->text('tc_job_address');
            $table->json('tc_job_geocoordinates');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('timecap_locations');
    }
};
