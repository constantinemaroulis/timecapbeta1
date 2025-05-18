<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('timecap_emp_timecard', function (Blueprint $table) {
            $table->timestamp('tc_adjusted_timecard_start')->nullable();
            $table->timestamp('tc_adjusted_timecard_end')->nullable();
        });
    }

    public function down()
    {
        Schema::table('timecap_emp_timecard', function (Blueprint $table) {
            $table->dropColumn('tc_adjusted_timecard_start');
            $table->dropColumn('tc_adjusted_timecard_end');
        });
    }
};
