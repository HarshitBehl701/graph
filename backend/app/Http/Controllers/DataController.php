<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataTableModal;
use App\Models\LabelStructureModal;
use App\Models\ValuesStructureModal;

class DataController extends Controller
{
    public function getDataTables(Request $request)
    {
         
        try {
            $data = DataTableModal::all()->where('is_active', 1);
            if (count($data) > 0) {

                return response([
                    'data' => $data,
                    'message' => 'List Found Successfully'
                ], 200);
            } else {
                return response([
                    'data' => [],
                    'message' => 'No Data Found'
                ], 404);
            }
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getDataLabels(Request $request,$data_id)
    {

        try {
            $data = DataTableModal::where('is_active', 1)->find($data_id);
            
            if ($data) {
                $labels = LabelStructureModal::where('data_id', $data->id)->where('is_active', 1)->get();

                if (count($labels) == 0) {
                    return response([
                        'data' => [],
                        'message' => 'No Data Found'
                    ], 404);
                }

                return response([
                    'data' => $labels,
                    'message' => 'List Found Successfully'
                ], 200);
            } else {
                return response([
                    'data' => [],
                    'message' => 'No Data Found'
                ], 404);
            }
        } catch (\Exception $err) {
            return response([
                'data' => $err,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getDataLabelsValues(Request $request,$data_id)
    {
        try {
            $data = DataTableModal::where('is_active', 1)->find($data_id);

            if ($data) {
                $labels = LabelStructureModal::where('data_id', $data->id)->where('is_active', 1)->get();

                if (count($labels) == 0) {
                    return response([
                        'data' => [],
                        'message' => 'No Data Found'
                    ], 404);
                }

                $labelIds = $labels->pluck('id')->toArray();

                $values = ValuesStructureModal::whereIn('label_id', $labelIds)->where('is_active', 1)->get();

                if (count($values) == 0) {
                    return response([
                        'data' => [],
                        'message' => 'No Data Found'
                    ], 404);
                }

                $dataArray = [];

                foreach ($labels as $index => $label) {
                    if (!array_key_exists($label->id, $dataArray)) {
                        $dataArray[] = [
                            $label->id => [
                                'label_name' => $label->label_name,
                                'values' => []
                            ]
                        ];
                    }
                }

                foreach ($values as $index => $value) {
                    if (array_key_exists($value->label_id, $dataArray)) {
                        $dataArray[$value->label_id]['values'][] = [$value->value];
                    }
                }

                if (count($dataArray) == 0) {
                    return response([
                        'data' => [],
                        'message' => 'No Data Found'
                    ], 404);
                }

                return response([
                    'data' => $dataArray,
                    'message' => 'Data Found Successfully'
                ], 200);
            } else {
                return response([
                    'data' => [],
                    'message' => 'No Data Found'
                ], 404);
            }
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function createDataTable(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'data_name' => 'required|string|min:2',
                'labels' => 'required|array',
                'labels.*.name' => 'required|string|min:2',
                'labels.*.value' => 'required|in:text,number',
            ]);

            $dataTable = DataTableModal::create([
                'name' => $validatedData['data_name'],
                'is_active' => 1
            ]);

            if (!$dataTable) {
                return response([
                    'data' => [],
                    'message' => 'Internal Server Error'
                ], 500);
            }

            $storeLabelData = [];

            foreach ($validatedData['labels'] as $index => $label) {
                $storeLabelData[] = [
                    'data_id' => $dataTable->id,
                    'label_name' => $label->name,
                    'type' => $label->type,
                    'is_active' => 1,
                ];
            }

            LabelStructureModal::insert($storeLabelData);

            return response([
                'message' => 'Data Created Successfully'
            ], 201);
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function insertValues(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'data_id' => 'required|string|min:2',
                'values' => 'required|array',
                'values.*.label_id' => 'required|string|min:1',
                'values.*.value' => 'required|in:text,number',
            ]);

            $dataTable = DataTableModal::find($request->data_id)->where('is_active', 1);

            if (!$dataTable) {
                return response([
                    'data' => [],
                    'message' => 'Data Table Not found'
                ], 404);
            }

            $labelIds = [];

            foreach($request['values'] as $index => $value)
            {
                $labelIds[] = $value->label_id;
            }

            $labels = LabelStructureModal::whereIn('id', $labelIds)->where('data_id',$dataTable->id)->where('is_active', 1)->get();

            if (!$labels) {
                return response([
                    'data' => [],
                    'message' => 'Labels Not found'
                ], 404);
            }

            $labelIds = [];

            foreach($labels as $index => $value)
            {
                $labelIds[] = $value->id;
            }

            $storeValues = [];

            foreach ($validatedData['values'] as $index => $value) {
                if(in_array($value->label_id,$labelIds))
                {
                    $storeValues[] = [
                        'label_id' => $value->label_id,
                        'value' => $value->value,
                        'is_active' => 1
                    ];
                }
            }

            LabelStructureModal::insert($storeValues);

            return response([
                'message' => 'Data Created Successfully'
            ], 201);
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function updateData(Request $request)
    {
        $validatedData  = $request->validate([
            'id' => 'required|string|min:1',
            'data_name' => 'string|min:2',
            'is_active' => 'in:0,1'
        ]);
        try {
            $data = DataTableModal::where('is_active', 1)->find($validatedData['id'])->update($validatedData);

            if ($data) {

                return response([
                    'data' => $data,
                    'message' => 'Data Updated Successfully'
                ], 200);
            } else {
                return response([
                    'data' => [],
                    'message' => 'Something Went Wrong While Updating Data Table'
                ], 500);
            }
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function updateLabel(Request $request)
    {
        $validatedData  = $request->validate([
            'label_id' => 'string|min:2',
            'label_name' => 'string|min:2',
            'type' => 'string|in:text,number',
            'is_active' => 'in:0,1'
        ]);
        try {
            $data = LabelStructureModal::where('is_active', 1)->find($validatedData['label_id'])->update($validatedData);

            if ($data) {
                return response([
                    'data' => $data,
                    'message' => 'Data Updated Successfully'
                ], 200);
            } else {
                return response([
                    'data' => [],
                    'message' => 'Something Went Wrong While Updating Data Table'
                ], 500);
            }
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function updateValue(Request $request)
    {
        $validatedData  = $request->validate([
            'value_id' => 'string|min:2',
            'value' => 'string|min:2',
            'is_active' => 'in:0,1'
        ]);
        try {
            $data = ValuesStructureModal::where('is_active', 1)->find($validatedData['label_id'])->update($validatedData);

            if ($data) {
                return response([
                    'data' => $data,
                    'message' => 'Data Updated Successfully'
                ], 200);
            } else {
                return response([
                    'data' => [],
                    'message' => 'Something Went Wrong While Updating Data Table'
                ], 500);
            }
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
}
