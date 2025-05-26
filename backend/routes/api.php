<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\DataTableModal;
use App\Models\LabelStructureModal;

Route::get('/list-data', function (Request $request) {
    try{
        $data = DataTableModal::all()->where('is_active',1);
    if(count($data) > 0){

        return response([
            'data' => $data,
            'message' => 'List Found Successfully'
        ],200);
    }else{
        return response([
            'data' => [],
            'message' => 'No Data Found'
        ],404);
    }
    }catch(\Exception $err){
        return response([
            'data' => [],
            'message' => 'Internal Server Error'
        ],500);
    }
});

Route::get('/list-data/detail/{id}', function (Request $request,$id) {
    try{
        $data = DataTableModal::where('is_active',1)->find($id);
        
    if($data){

        $labelStructure = LabelStructureModal::where('data_id',$data->id)->get();
        return response([
            'data_table' => $data,
            'label_structure' => $labelStructure,
            'message' => 'Data Found Successfully'
        ],200);
    }else{
        return response([
            'data' => [],
            'message' => 'No Data Found'
        ],404);
    }
    }catch(\Exception $err){
        return response([
            'data' => [],
            'message' => 'Internal Server Error'
        ],500);
    }
});


Route::post('/list-data/store', function (Request $request) {
    try{

        $validatedData = $request->validate([
            'data_name' => 'required|string|min:2',
            'labels' => 'required|array',
            'labels.*' => 'required|string|min:2',
            'values' => 'required|array',
            'values.*' => 'required|string|min:2'
        ]);

        $dataTable = DataTableModal::create([
            'name' => $validatedData['data_name'],
            'is_active' => 1
        ]);
        
        if(!$dataTable)
        {
            return response([
            'data' => [],
            'message' => 'Internal Server Error'
        ],500);
        }

        $storeLabelData = [];

        foreach ($validatedData['labels'] as $index => $label) {
            $storeLabelData[] = [
                'data_id' => $dataTable->id,
                'label_name' => $label,
                'label_value' => $validatedData['values'][$index] ?? null,
                'is_active' => 1,
            ];
        }

        LabelStructureModal::insert($storeLabelData);

        return response([
            'message' => 'Data Created Successfully'
        ],201);
        

    }catch(\Exception $err){
        return response([
            'data' => [],
            'message' => 'Internal Server Error'
        ],500);
    }
});