<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_payroll', function (Blueprint $table) {
            $table->id('tc_payroll_id');
            $table->string('tc_payroll_created_at');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('timecap_payroll');
    }
};