<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_emp', function (Blueprint $table) {
            $table->id('tc_emp_id');
            $table->string('erp_emp_id');
            $table->string('tc_emp_ssn6', 6);
            $table->unsignedBigInteger('tc_emp_local_id');
            $table->unsignedBigInteger('tc_emp_union_id');
            $table->string('tc_emp_classification');
            $table->boolean('tc_emp_portal_registered');
            $table->timestamp('tc_emp_registered_time');
            $table->timestamp('tc_emp_updated')->nullable();
            $table->string('tc_emp_email')->nullable(); // Allow null values
            $table->boolean('tc_emp_portal_activate')->nullable;
            $table->boolean('tc_emp_portal_activate_temp')->nullable;
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('timecap_emp');
    }
};
