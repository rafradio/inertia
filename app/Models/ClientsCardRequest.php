<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientsCardRequest extends Model
{
    protected $fillable = [
        'fio',
        'type_card',
    ];
}
