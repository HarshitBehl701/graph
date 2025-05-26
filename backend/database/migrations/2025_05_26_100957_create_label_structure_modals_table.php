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
        Schema::create('label_structure_modals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('data_id');
            $table->foreign('data_id')->references('id')->on('data_table_modals')->onDelete('cascade');
            $table->string('label_name');
            $table->string('label_value');
            $table->string('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('label_structure_modals');
    }
};
