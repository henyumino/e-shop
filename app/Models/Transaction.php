<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transaction';

    protected $fillable = [
        'user_id',
        'item',
        'total',
        'name',
        'address',
        'country',
        'province',
        'city',
        'phone_number',
        'resi',
        'status'
    ];

    public function getCreatedAtAttribute(){
        return Carbon::parse($this->attributes['created_at'])
        ->format('Y/m/d');
    }

}
