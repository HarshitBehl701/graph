<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;

Route::get('/get_data_tables', [DataController::class, 'getDataTables']);

Route::get('/get_data_labels/{data_id}', [DataController::class, 'getDataLabels']);

Route::get('/get_data_labels_values/{data_id}', [DataController::class, 'getDataLabelsValues']);

Route::post('/create_data_table', [DataController::class, 'createDataTable']);

Route::post('/add_values', [DataController::class, 'insertValues']);

Route::post('/update_data', [DataController::class, 'updateData']);

Route::post('/update_label', [DataController::class, 'updateLabel']);

Route::post('/update_value', [DataController::class, 'updateValue']);