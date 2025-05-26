<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Modal\LabelStructureModal;

class DataTableModal extends Model
{
    protected $fillable  = ['name','is_active'];

    public function labelStructureModal(): HasMany
    {
        return $this->hasMany(LabelStructureModal::class);
    }

}
