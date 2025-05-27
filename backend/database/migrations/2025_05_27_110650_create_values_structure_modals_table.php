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
        Schema::create('values_structure', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('label_id');
            $table->foreign('label_id')->references('id')->on('label_structure')->onDelete('cascade');
            $table->string('value');
            $table->enum('is_active',[0,1])->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('values_structure');
    }
};
