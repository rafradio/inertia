<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients_card_requests', function (Blueprint $table) {
            $table->id();
            $table->string('fio');
            $table->string('type_card');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients_card_requests');
    }
};
