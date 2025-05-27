<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LabelStructureModal extends Model
{
    protected $fillable  = ['data_id',
'label_name','is_active'];
    protected $table = 'label_structure';
}
