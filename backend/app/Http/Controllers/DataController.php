<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataTableModal;
use App\Models\LabelStructureModal;
use App\Models\ValuesStructureModal;

class DataController extends Controller
{
    public function getDataTables()
    {
        try {
            $data = DataTableModal::where('is_active', 1)->get();
            return response([
                'data' => $data,
                'message' => $data->isEmpty() ? 'No Data Found' : 'List Found Successfully'
            ], $data->isEmpty() ? 404 : 200);
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getDataLabels($data_id)
    {
        try {
            $data = DataTableModal::where('is_active', 1)->find($data_id);
            if (!$data) {
                return response([
                    'data' => [],
                    'message' => 'No Data Found'
                ], 404);
            }

            $labels = LabelStructureModal::where('data_id', $data->id)
                ->where('is_active', 1)
                ->get();

            if ($labels->isEmpty()) {
                return response([
                    'data' => [],
                    'message' => 'No Labels Found'
                ], 404);
            }

            $labelIds = $labels->pluck('id');
            $values = ValuesStructureModal::whereIn('label_id', $labelIds)
                ->where('is_active', 1)
                ->get();

            $result = $labels->map(function ($label) use ($values) {
                $labelValues = $values->where('label_id', $label->id)
                    ->map(function ($val) {
                        return [
                            'id' => $val->id,
                            'value' => $val->value,
                        ];
                    })
                    ->values();

                return [
                    'label_id' => $label->id,
                    'label_name' => $label->label_name,
                    'values' => $labelValues
                ];
            });

            return response([
                'data' => $result,
                'message' => $labels->isEmpty() ? 'No Labels Found' : 'Labels Found Successfully'
            ], $labels->isEmpty() ? 404 : 200);
        } catch (\Exception $err) {
            return response([
                'data' => [],
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getDataLabelsValues($data_id)
    {
        try {
            $data = DataTableModal::where('is_active', 1)->find($data_id);
            if (!$data) {
                return response([
                    'data' => [],
                    'message' => 'No Data Found'
                ], 404);
            }

            $labels = LabelStructureModal::where('data_id', $data->id)
                ->where('is_active', 1)
                ->get();

            if ($labels->isEmpty()) {
                return response([
                    'data' => [],
                    'message' => 'No Labels Found'
                ], 404);
            }

            $labelIds = $labels->pluck('id');
            $values = ValuesStructureModal::whereIn('label_id', $labelIds)
                ->where('is_active', '1')
                ->get();

            $result = $labels->map(function ($label) use ($values) {
                $labelValues = $values->where('label_id', $label->id)
                    ->map(function ($val) {
                        return [
                            'id' => $val->id,
                            'value' => $val->value,
                        ];
                    })
                    ->values(); // reset keys

                return [
                    'label_id' => $label->id,
                    'label_name' => $label->label_name,
                    'values' => $labelValues
                ];
            });

            return response([
                'data' => $result,
                'message' => 'Data Found Successfully'
            ], 200);
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
                'labels' => 'required|array|min:1',
                'labels.*.name' => 'required|string|min:2',
                'labels.*.type' => 'required|in:text,number',
            ]);

            $dataTable = DataTableModal::create([
                'name' => $validatedData['data_name'],
                'is_active' => 1
            ]);

            $storeLabelData = [];
            foreach ($validatedData['labels'] as $label) {
                $storeLabelData[] = [
                    'data_id' => $dataTable->id,
                    'label_name' => $label['name'],
                    'type' => $label['type'],
                    'is_active' => 1,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }

            LabelStructureModal::insert($storeLabelData);

            return response([
                'message' => 'Data Created Successfully'
            ], 201);
        } catch (\Exception $err) {
            return response([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function insertValues(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'data_id' => 'required|exists:data_table,id',
                'values' => 'required|array|min:1',
                'values.*.label_id' => 'required|exists:label_structure,id',
                'values.*.value' => 'required',
            ]);

            $storeValues = [];
            foreach ($validatedData['values'] as $value) {
                $storeValues[] = [
                    'label_id' => (int)$value['label_id'],
                    'value' => $value['value'],
                    'is_active' => '1'
                ];
            }


            $response = ValuesStructureModal::insert($storeValues);



            return response([
                'message' => 'Values Added Successfully'
            ], 201);
        } catch (\Exception $err) {
            return response([
                'err' => $err,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function updateData(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id' => 'required|exists:data_table,id',
                'data_name' => 'sometimes|string|min:2',
                'is_active' => 'sometimes|in:0,1'
            ]);

            $data = DataTableModal::where('is_active', 1)
                ->find($validatedData['id'])
                ->update($validatedData);

            return response([
                'message' => 'Data Updated Successfully'
            ], 200);
        } catch (\Exception $err) {
            return response([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function updateLabel(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id' => 'required|exists:label_structure,id',
                'label_name' => 'sometimes|string|min:2',
                'type' => 'sometimes|in:text,number',
                'is_active' => 'sometimes|in:0,1'
            ]);

            LabelStructureModal::where('is_active', 1)
                ->find($validatedData['id'])
                ->update($validatedData);

            return response([
                'message' => 'Label Updated Successfully'
            ], 200);
        } catch (\Exception $err) {
            return response([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function updateValue(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id' => 'required|exists:values_structure,id',
                'value' => 'sometimes|string|min:1',
                'is_active' => 'sometimes|in:0,1'
            ]);

            $fieldKey = $request->has('value') ? 'value' : ($request->has('is_active') ? 'is_active' : null);
            $fieldValue = $fieldKey ? $validatedData[$fieldKey] : null;


            $record = ValuesStructureModal::where('id', $validatedData['id'])
                ->first();

            if (!$record) {
                return response([
                    'message' => 'Record not found or inactive'
                ], 404);
            }

            $record->update([$fieldKey => "$fieldValue"]);

            return response([
                'message' => 'Value Updated Successfully'
            ], 200);
        } catch (\Exception $err) {
            return response([
                'err' => $err,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
}
