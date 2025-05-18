<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_notifications', function (Blueprint $table) {
            $table->id('tc_notification_id');
            $table->text('tc_message');
            $table->string('tc_type');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('timecap_notifications');
    }
};