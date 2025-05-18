<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_costcodes', function (Blueprint $table) {
            $table->id('tc_costcode_id');
            $table->string('tc_costcode_division');
            $table->string('tc_costcode_code_num');
            $table->text('tc_costcode__code_description');
        });
    }
    public function down()
    {
        Schema::dropIfExists('timecap_costcodes');
    }
};