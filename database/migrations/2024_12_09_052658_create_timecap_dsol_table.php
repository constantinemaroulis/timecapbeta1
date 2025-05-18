<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_dsol', function (Blueprint $table) {
            $table->id('tc_dsol_id');
            $table->string('tc_timecard_id');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('timecap_dsol');
    }
};