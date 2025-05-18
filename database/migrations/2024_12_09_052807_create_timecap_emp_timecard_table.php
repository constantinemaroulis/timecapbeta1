<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_emp_timecard', function (Blueprint $table) {
            $table->id('tc_timecard_id');
            $table->unsignedBigInteger('tc_emp_id');            
            $table->json('tc_job_costcodes')->nullable();
            $table->string('tc_timecard_start');
            $table->string('tc_timecard_end')->nullable();
            $table->string('tc_emp_timecard_start_photo')->nullable();
            $table->string('tc_emp_timecard_end_photo')->nullable();
            $table->string('tc_emp_timecard_start_signature')->nullable();
            $table->string('tc_emp_timecard_end_signature')->nullable();
            $table->string('tc_timecard_submitted')->default('pending');
            $table->string('tc_timecard_approved')->default('pending');
            $table->string('tc_timecard_status')->default('pending');
            $table->timestamps();

            // Add the foreign key constraint
            $table->foreign('tc_emp_id')
                ->references('tc_emp_id')
                ->on('timecap_emp')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('timecap_emp_timecard');
    }
};
