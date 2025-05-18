<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_emp_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tc_emp_id');
            $table->string('tc_emp_detail_first_name');
            $table->string('tc_emp_detail_last_name');
            $table->string('tc_emp_detail_address1');
            $table->string('tc_emp_detail_address2')->nullable();
            $table->string('tc_emp_detail_address3')->nullable();
            $table->string('tc_emp_detail_city');
            $table->string('tc_emp_detail_state');
            $table->string('tc_emp_detail_zip');
            $table->date('tc_emp_detail_dob');
            $table->date('tc_emp_detail_hired')->nullable();
            $table->date('tc_emp_detail_last_worked')->nullable();
            $table->string('tc_emp_detail_phone')->nullable(); // Allow null values
            $table->timestamps();

            $table->foreign('tc_emp_id')->references('tc_emp_id')->on('timecap_emp')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('timecap_emp_details');
    }
};
