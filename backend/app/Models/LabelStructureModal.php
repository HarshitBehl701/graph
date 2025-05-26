<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LabelStructureModal extends Model
{
    protected $fillable  = ['data_id',
'label_name',
'label_value','is_active'];
}
