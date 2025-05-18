<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_users', function (Blueprint $table) {
            $table->id('tc_user_id');
            $table->string('tc_user_name');
            $table->string('tc_user_email')->unique();
            $table->string('tc_user_password');
            $table->enum('tc_user_role', ['admin', 'manager', 'employee']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('timecap_users');
    }
};
