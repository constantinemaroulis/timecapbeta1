<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timecap_audit', function (Blueprint $table) {
            $table->id('tc_audit_id');
            $table->string('tc_action');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('timecap_audit');
    }
};