<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataTableModal extends Model
{
    protected $fillable  = ['name','is_active'];

    protected $table = 'data_table';

}
