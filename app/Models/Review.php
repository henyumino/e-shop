<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'review';

    protected $fillable = [
        'user_id',
        'item_id',
        'body'
    ];

    public function getUpdatedAtAttribute(){
        return Carbon::parse($this->attributes['updated_at'])
        ->diffForHumans();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
