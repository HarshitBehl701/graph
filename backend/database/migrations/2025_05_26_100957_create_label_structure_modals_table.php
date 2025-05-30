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
        Schema::create('label_structure', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('data_id');
            $table->foreign('data_id')->references('id')->on('data_table')->onDelete('cascade');
            $table->string('label_name');
            $table->enum('type',['text','number'])->default('text');
            $table->enum('is_active',[0,1])->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('label_structure');
    }
};
