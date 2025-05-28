<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ValuesStructureModal extends Model
{
    protected $fillable = ['label_id','type','value','is_active'];
    protected $table = 'values_structure';
}